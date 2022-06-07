import type { YearbookSection } from "types";

import { User } from "server/models";
import { hasToBeAuthenticated } from "server/policies";

export class YearbookController {
  static getYearbook = defineEventHandler(async event => {
    const { req } = event;

    hasToBeAuthenticated(event);

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
  });

  static getUser = defineEventHandler(async event => {
    const { req } = event;

    hasToBeAuthenticated(event);

    const query = useQuery(req);
    const userId = query.id as string | undefined;
    if (!userId) return;

    const user = await User.findOne({
      isShown: true,
      "socialMedia.fb": userId,
    });

    if (!user)
      return createError({ message: "Can't find the user.", statusCode: 404 });

    return user;
  });
}
