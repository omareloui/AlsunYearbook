import { User } from "server/models";
import { UpdateMe } from "types";
import { extractFBId, hash, compareHash, createTokens } from "server/utils";

import { CompatibilityEvent } from "h3";
import { useConstants } from "~~/composables/useConstants";
import { useParseDateInSeconds } from "~~/composables/useParseDate";

import { config } from "server/config";
import { hasToBeAuthenticated } from "server/policies";

const { JWT_NAME, REFRESH_TOKEN_NAME } = useConstants();

export class AuthController {
  static checkFBID = defineEventHandler(async event => {
    const { req } = event;
    const { id } = await useBody(req);

    if (!id)
      throw createError({
        message: "No facebook link provided.",
        statusCode: 400,
      });

    const extractedFBId = extractFBId(id as string);

    const user = await User.findOne({
      "socialMedia.fb": { $regex: `^${extractedFBId}$`, $options: "i" },
    });
    if (!user)
      throw createError({
        message:
          "This facebook account doesn't exist in the yearbook. You can't signup.",
        statusCode: 400,
      });

    if (user.username || user.password)
      throw createError({
        message: "You are registered already. Try signing in instead.",
        statusCode: 400,
      });

    return extractedFBId;
  });

  static signup = defineEventHandler(async event => {
    const { req } = event;

    const { username, password, fbId } = await useBody(req);

    this.validateSignData({ username, password });

    const duplicatedUsername = await User.findOne({ username });
    if (duplicatedUsername)
      throw createError({
        message: "The username already in use. Try another one.",
        statusCode: 400,
      });

    const user = await User.findOne({ "socialMedia.fb": fbId });
    if (!user)
      throw createError({
        message: "This facebook account doesn't exist in the yearbook",
        statusCode: 400,
      });

    const hashedPass = await hash(password);

    user.username = username;
    user.password = hashedPass;

    await user.save();

    const [token, refreshToken] = await createTokens(user);

    this.setCookies(event, token.body, refreshToken.body);

    return { user, token, refreshToken };
  });

  static signin = defineEventHandler(async event => {
    const { username, password } = await useBody(event.req);
    const user = await User.findOne({
      username: new RegExp(`^${username}$`, "i"),
    });

    if (!user)
      throw createError({
        message: "Can't find any account with this username.",
      });

    const isValidPassword = await compareHash(password, user.password!);
    if (!isValidPassword) throw createError({ message: "Incorrect password." });
    const [token, refreshToken] = await createTokens(user);
    this.setCookies(event, token.body, refreshToken.body);
    return { user, token, refreshToken };
  });

  static me = defineEventHandler(async event => {
    const { context } = event;
    if (!context.user) return {};
    const user = await User.findOne({ _id: context.user.id });
    if (!user) throw createError({ message: "Can't find the user" });
    const [token, refreshToken] = createTokens(user);
    this.setCookies(event, token.body, refreshToken.body);
    return { user, token, refreshToken };
  });

  static updateMe = defineEventHandler(async event => {
    const { req, context } = event;
    hasToBeAuthenticated(event);
    const { username, newPassword, oldPassword } = (await useBody(
      req
    )) as UpdateMe;
    const user = await User.findOne({ _id: context.user.id });

    if (!user)
      throw createError({ message: "Can't find you.", statusCode: 404 });

    const changeUsername = username && username !== user.username;
    const changePassword = newPassword && oldPassword;

    if (changeUsername) {
      const duplicatedUsername = await User.findOne({ username });
      if (duplicatedUsername)
        throw createError({
          message: "The username already in use. Try another one.",
          statusCode: 400,
        });
      user.username = username;
    }

    if (changePassword) {
      const isValidOldPassword = await compareHash(
        oldPassword,
        user.password || ""
      );
      if (!isValidOldPassword)
        throw createError({
          message: "The old password is not correct.",
          statusCode: 400,
        });
      if (newPassword.length < 8)
        throw createError({
          message: "The password has to be at least 8 characters long.",
          statusCode: 400,
        });
      user.password = await hash(newPassword);
    }

    if (changeUsername || changePassword) {
      await user.save();

      const [token, refreshToken] = createTokens(user);
      this.setCookies(event, token.body, refreshToken.body);
    }

    return user;
  });

  /* ============== Utils ============== */
  static setCookies(
    event: CompatibilityEvent,
    jwt: string,
    refreshToken: string
  ) {
    const options = { path: "/", sameSite: "lax" as const };

    [
      {
        name: JWT_NAME,
        content: jwt,
        maxAge: useParseDateInSeconds(config.tokens.jwt.expiration),
      },
      {
        name: REFRESH_TOKEN_NAME,
        content: refreshToken,
        maxAge: useParseDateInSeconds(config.tokens.refresh.expiration),
      },
    ].forEach(x =>
      setCookie(event, x.name, x.content, { ...options, maxAge: x.maxAge })
    );
  }

  static removeCookies(event: CompatibilityEvent) {
    [
      { name: JWT_NAME, content: "" },
      { name: REFRESH_TOKEN_NAME, content: "" },
    ].forEach(x => deleteCookie(event, x.name));
  }

  private static validateSignData({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const getError = (message: string) => ({ message, statusCode: 400 });

    if (!username)
      throw createError(getError("You have to provide a username."));
    if (!password)
      throw createError(getError("You have to provide a password."));
    if (password.length < 8)
      throw createError(
        getError("The password has to be at least 8 characters long.")
      );
  }
}
