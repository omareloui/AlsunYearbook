import mongoose from "mongoose";
import { useBody, useQuery, createError } from "h3";

import { CloseFriend } from "~~/server/models";
import { hasToBeAuthenticated } from "~~/server/policies";

import type {
  APIFunction,
  CloseFriend as CloseFriendInterface,
} from "~~/@types";

export class CloseFriendController {
  static getMine: APIFunction = async req => {
    hasToBeAuthenticated(req);
    const closeFriends = await CloseFriend.find({
      user: new mongoose.Types.ObjectId(req.user.id),
    })
      .populate("closeFriend")
      .exec();

    return closeFriends.map(cf => cf.closeFriend);
  };

  static make: APIFunction = async req => {
    hasToBeAuthenticated(req);

    const { id } = await useBody(req);

    if (!id)
      throw createError({
        message: "You have to provide an id.",
        statusCode: 400,
      });

    const closeFriendData = {
      user: new mongoose.Types.ObjectId(req.user.id),
      closeFriend: new mongoose.Types.ObjectId(id),
    };

    const alreadyExisting = await CloseFriend.findOne(closeFriendData);
    if (alreadyExisting) return this.populate(alreadyExisting);

    const closeFriend = new CloseFriend(closeFriendData);
    await closeFriend.save();

    return this.populate(closeFriend);
  };

  static remove: APIFunction = async req => {
    hasToBeAuthenticated(req);
    if (req.method !== "DELETE")
      throw createError({ message: "Invalid method.", statusCode: 400 });

    const { id } = useQuery(req) as { id: string };

    const closeFriendData = {
      user: new mongoose.Types.ObjectId(req.user.id),
      closeFriend: new mongoose.Types.ObjectId(id),
    };

    const { deletedCount } = await CloseFriend.deleteOne(closeFriendData);

    return { ok: deletedCount === 1 };
  };

  /* ==== Utils ==== */
  static async getUserCloseFriendsCount(userId: string) {
    const incomingCount = await CloseFriend.countDocuments({
      closeFriend: userId,
    });
    const outgoingCount = await CloseFriend.countDocuments({ user: userId });
    return { incomingCount, outgoingCount };
  }

  private static populate(doc) {
    return CloseFriend.populate(
      doc,
      "user closeFriend"
    ) as Promise<unknown> as Promise<CloseFriendInterface>;
  }
}
