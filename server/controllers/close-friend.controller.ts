import mongoose from "mongoose";

import { CloseFriend } from "server/models";
import { hasToBeAuthenticated } from "server/policies";

import type { CloseFriend as CloseFriendInterface } from "types";

export class CloseFriendController {
  static getMine = defineEventHandler(async event => {
    const { context } = event;
    hasToBeAuthenticated(event);
    const closeFriends = await CloseFriend.find({
      user: new mongoose.Types.ObjectId(context.user.id),
    })
      .populate("closeFriend")
      .exec();

    return closeFriends.map(cf => cf.closeFriend);
  });

  static make = defineEventHandler(async event => {
    const { req, context } = event;
    hasToBeAuthenticated(event);

    const { id } = await useBody(req);

    if (!id)
      throw createError({
        message: "You have to provide an id.",
        statusCode: 400,
      });

    const closeFriendData = {
      user: new mongoose.Types.ObjectId(context.user.id),
      closeFriend: new mongoose.Types.ObjectId(id),
    };

    const alreadyExisting = await CloseFriend.findOne(closeFriendData);
    if (alreadyExisting)
      return this.populate(alreadyExisting as unknown as CloseFriendInterface);

    const closeFriend = new CloseFriend(closeFriendData);
    await closeFriend.save();

    return this.populate(closeFriend as unknown as CloseFriendInterface);
  });

  static remove = defineEventHandler(async event => {
    const { req, context } = event;
    hasToBeAuthenticated(event);

    const { id } = useQuery(req) as { id: string };

    const closeFriendData = {
      user: new mongoose.Types.ObjectId(context.user.id),
      closeFriend: new mongoose.Types.ObjectId(id),
    };

    const { deletedCount } = await CloseFriend.deleteOne(closeFriendData);

    return { ok: deletedCount === 1 };
  });

  /* ==== Utils ==== */
  static async getUserCloseFriendsCount(userId: string) {
    const incomingCount = await CloseFriend.countDocuments({
      closeFriend: userId,
    });
    const outgoingCount = await CloseFriend.countDocuments({ user: userId });
    return { incomingCount, outgoingCount };
  }

  private static populate(doc: CloseFriendInterface) {
    return CloseFriend.populate(
      doc,
      "user closeFriend"
    ) as Promise<unknown> as Promise<CloseFriendInterface>;
  }
}
