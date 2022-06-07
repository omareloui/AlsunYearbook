import mongoose from "mongoose";

import { Message } from "server/models";
import { hasToBeInYearbook } from "server/policies";

import type { Message as MessageInterface, SendMessage } from "types";

export class MessageController {
  static getInbox = defineEventHandler(async event => {
    const { context } = event;
    hasToBeInYearbook(event);

    const messages = await Message.find({ receiver: context.user.id })
      .sort("-createdAt")
      .populate("author");

    await this.readMessages(messages as unknown as MessageInterface[]);

    return this.removeAnonymous(messages as unknown as MessageInterface[]);
  });

  static getSent = defineEventHandler(event => {
    const { context } = event;
    hasToBeInYearbook(event);

    return Message.find({ author: context.user.id })
      .sort("-createdAt")
      .populate("receiver");
  });

  static getUnread = defineEventHandler(async event => {
    const { context } = event;
    hasToBeInYearbook(event);

    const messages = await Message.find({
      receiver: context.user.id,
      isRead: false,
    })
      .sort("-createdAt")
      .populate("author");

    return this.removeAnonymous(messages as unknown as MessageInterface[]);
  });

  static send = defineEventHandler(async event => {
    const { req, context } = event;
    hasToBeInYearbook(event);

    const { message, receiver, isAnonymous } = (await useBody(
      req
    )) as SendMessage;

    if (context.user.id === receiver)
      throw createError({
        message: "You can't leave yourself a message.",
        statusCode: 400,
      });
    if (!message || !message.trim())
      throw createError({
        message: "You have to provide a message.",
        statusCode: 400,
      });

    return new Message({
      message: message,
      author: new mongoose.Types.ObjectId(context.user.id),
      receiver: new mongoose.Types.ObjectId(receiver),
      isAnonymous,
    }).save();
  });

  // TODO:
  //  async makeFavorite({ body: { messageId } }, res) {
  //   try {
  //     await Message.findByIdAndUpdate(messageId, { isFavorite: true })
  //     return res.status(200).send({ ok: true })
  //   } catch (e) {
  //     return res.status(500).send(e.message)
  //   }
  // },
  // async removeFavorite({ body: { messageId } }, res) {
  //   try {
  //     await Message.findByIdAndUpdate(messageId, { isFavorite: false })
  //     return res.status(200).send({ ok: true })
  //   } catch (e) {
  //     return res.status(500).send(e.message)
  //   }
  // },

  // TODO:
  // async getUnreadCount({ user: { id: userId } }, res) {
  //   try {
  //     const unreadCount = await Message.countDocuments({ receiver: userId, isRead: false })
  //     return res.status(200).send({ unreadCount })
  //   } catch (e) {
  //     return res.status(500).send(e.message)
  //   }
  // },

  /* ==== Utils ==== */
  static async getUserMessagesCount(userId: string) {
    const incomingCount = await Message.countDocuments({ receiver: userId });
    const outgoingCount = await Message.countDocuments({ author: userId });
    return { incomingCount, outgoingCount };
  }

  private static readMessages(messages: MessageInterface[]) {
    return Promise.all(
      messages.map(async m => {
        if (m.isRead) return m;

        m.isRead = true;
        await (m as any).save();
        return m;
      })
    );
  }

  private static removeAnonymous(messages: MessageInterface[]) {
    return messages.map(m => {
      if (!m.isAnonymous) return m;
      m.author = undefined;
      return m;
    });
  }
}
