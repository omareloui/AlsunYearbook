import { useBody, createError } from "h3";
import mongoose from "mongoose";

import { Message } from "~~/server/models";
import { hasToBeInYearbook } from "~~/server/policies";

import type {
  APIFunction,
  Message as MessageInterface,
  SendMessage,
} from "~~/@types";

export class MessageController {
  static getInbox: APIFunction = async req => {
    hasToBeInYearbook(req);

    const messages = await Message.find({ receiver: req.user.id })
      .sort("-createdAt")
      .populate("author");

    await this.readMessages(messages);

    return this.removeAnonymous(messages as unknown as MessageInterface[]);
  };

  static getSent: APIFunction = req => {
    hasToBeInYearbook(req);

    return Message.find({ author: req.user.id })
      .sort("-createdAt")
      .populate("receiver");
  };

  static getUnread: APIFunction = async req => {
    hasToBeInYearbook(req);

    const messages = await Message.find({
      receiver: req.user.id,
      isRead: false,
    })
      .sort("-createdAt")
      .populate("author");

    return this.removeAnonymous(messages as unknown as MessageInterface[]);
  };

  static send: APIFunction = async req => {
    hasToBeInYearbook(req);

    const { message, receiver, isAnonymous } = (await useBody(
      req
    )) as SendMessage;

    if (req.user.id === receiver)
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
      author: new mongoose.Types.ObjectId(req.user.id),
      receiver: new mongoose.Types.ObjectId(receiver),
      isAnonymous,
    }).save();
  };

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

  // async getUnreadCount({ user: { id: userId } }, res) {
  //   try {
  //     const unreadCount = await Message.countDocuments({ receiver: userId, isRead: false })
  //     return res.status(200).send({ unreadCount })
  //   } catch (e) {
  //     return res.status(500).send(e.message)
  //   }
  // },

  /* ==== Utils ==== */
  private static readMessages(messages) {
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
