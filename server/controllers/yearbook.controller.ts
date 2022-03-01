import { useQuery, createError } from "h3";
import type { APIFunction, YearbookSection } from "~~/@types";

import { User } from "../models";

export class YearbookController {
  static getYearbook: APIFunction = async req => {
    const query = await useQuery(req);
    const section = query.section as YearbookSection | undefined;

    if (!section) return;

    const users = await User.find({
      isShown: true,
      role: section.toUpperCase().replace(/S$/, ""),
    })
      .sort([
        ["name.first", 1],
        ["name.second", 1],
        ["name.third", 1],
      ])
      .exec();

    return users;
  };

  static getUser: APIFunction = async req => {
    const query = useQuery(req);
    const userId = query.id as string | undefined;
    if (!userId) return;

    const user = await User.findOne({
      isShown: true,
      "socialMedia.fb": userId,
    });

    if (!user)
      return createError({ message: "Can't find the user", statusCode: 404 });

    return user;
  };
}
