import { ServerResponse } from "http";
import { useQuery, useBody, createError, setCookie } from "h3";

import { User } from "~~/server/models";
import { APIFunction, APIResponse, Authentication, UpdateMe } from "~~/@types";
import { extractFBId, hash, compareHash, createTokens } from "~~/server/utils";

import { useConstants } from "~~/composables/useConstants";
import { useParseDateInSeconds } from "~~/composables/useParseDate";

import { config } from "~~/server/config";
import { hasToBeAuthenticated } from "~~/server/policies";

const { JWT_NAME, REFRESH_TOKEN_NAME } = useConstants();

export class AuthController {
  static checkFBID: APIFunction = async req => {
    const query = useQuery(req);

    const id = query.id;
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
  };

  static signup: APIFunction<Promise<Authentication>> = async (req, res) => {
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

    this.setCookies(res, token.body, refreshToken.body);

    return { user, token, refreshToken };
  };

  static signin: APIFunction<Promise<Authentication>> = async (req, res) => {
    const { username, password } = await useBody(req);
    const user = await User.findOne({ username });
    if (!user)
      throw createError({
        message: "Can't find any account with this username.",
      });

    const isValidPassword = await compareHash(password, user.password);
    if (!isValidPassword) throw createError({ message: "Incorrect password." });

    const [token, refreshToken] = await createTokens(user);

    this.setCookies(res, token.body, refreshToken.body);

    return { user, token, refreshToken };
  };

  static me: APIFunction<Promise<Authentication | {}>> = async (req, res) => {
    if (!req.user) return {};

    const user = await User.findOne({ _id: req.user.id });
    if (!user) throw createError({ message: "Can't find the user" });
    const [token, refreshToken] = createTokens(user);
    this.setCookies(res, token.body, refreshToken.body);
    return { user, token, refreshToken };
  };

  static updateMe: APIFunction = async (req, res) => {
    hasToBeAuthenticated(req);
    const { username, newPassword, oldPassword } = (await useBody(
      req
    )) as UpdateMe;
    const user = await User.findOne({ _id: req.user.id });

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
      const isValidOldPassword = await compareHash(oldPassword, user.password);
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
      this.setCookies(res, token.body, refreshToken.body);
    }

    return user;
  };

  /* ============== Utils ============== */
  static setCookies(res: APIResponse, jwt: string, refreshToken: string) {
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
      setCookie(res, x.name, x.content, { ...options, maxAge: x.maxAge })
    );
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
