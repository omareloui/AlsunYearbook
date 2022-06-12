import { hasToHaveAuthority } from "server/policies";

import { User, Message, CloseFriend } from "server/models";
import type {
  User as UserInterface,
  Message as MessageInterface,
  UserRole,
  UserAuthority,
  MessagesStatistics,
  CloseFriendsStatistics,
  UsersStatistics,
  Statistics,
} from "types";

export class StatisticsController {
  static getAll = defineEventHandler<Statistics>(async event => {
    hasToHaveAuthority(event);

    const users = await this.getUsers();
    const closeFriends = await this.getCloseFriends();
    const messages = await this.getMessages();

    return {
      users,
      closeFriends,
      messages,
    };
  });

  // =========== Utils =========== //
  private static async getUsers(): Promise<UsersStatistics> {
    const users = await User.find();
    const totalUsersCount = users.length;

    const notRegisteredCount = users.filter(x => !x.username).length;

    const rolesCount: { [K in UserRole]: number } = {
      STUDENT: 0,
      PROFESSOR: 0,
      SPECIAL_MENTION: 0,
      VISITOR: 0,
    };

    const authorityRoleCount: { [K in UserAuthority]: number } = {
      ADMIN: 0,
      ASSISTANT_ADMIN: 0,
      ASSISTANT_TO_ADMIN: 0,
      MODERATOR: 0,
      USER: 0,
    };

    users.forEach(u => {
      rolesCount[u.role]++;
      authorityRoleCount[u.authorityRole]++;
    });

    return {
      rolesCount,
      authorityRoleCount,
      totalUsersCount,
      notRegisteredCount,
    };
  }

  private static async getCloseFriends(): Promise<CloseFriendsStatistics> {
    const closeFriends = await CloseFriend.find().populate("user closeFriend");

    const totalRecordsCount = closeFriends.length;

    const closeFriendsCounter = {} as {
      [UserId: string]: {
        user: UserInterface;
        hasCloseFriend: number;
        isCloseFriend: number;
      };
    };

    closeFriends.forEach(cf => {
      const user = cf.user as unknown as UserInterface;
      const closeFriend = cf.closeFriend as unknown as UserInterface;

      const userId = user._id.toString();
      const closeFriendId = closeFriend._id.toString();

      if (!(userId in closeFriendsCounter))
        closeFriendsCounter[userId] = {
          user: user,
          hasCloseFriend: 0,
          isCloseFriend: 0,
        };

      if (!(closeFriendId in closeFriendsCounter))
        closeFriendsCounter[closeFriendId] = {
          user: closeFriend,
          hasCloseFriend: 0,
          isCloseFriend: 0,
        };

      closeFriendsCounter[userId].hasCloseFriend++;
      closeFriendsCounter[closeFriendId].isCloseFriend++;
    });

    const _closeFriendsCounter = Object.values(closeFriendsCounter);

    const topHasCloseFriends = [
      ..._closeFriendsCounter.sort(
        (a, b) => b.hasCloseFriend - a.hasCloseFriend
      ),
    ].splice(0, 10);
    const topIsCloseFriends = [
      ..._closeFriendsCounter.sort((a, b) => b.isCloseFriend - a.isCloseFriend),
    ].splice(0, 10);

    return { totalRecordsCount, topHasCloseFriends, topIsCloseFriends };
  }

  private static async getMessages(): Promise<MessagesStatistics> {
    const messages = await Message.find().populate("author receiver");

    const totalMessageCount = messages.length;
    const anonymous = [] as MessageInterface[];
    const unread = [] as MessageInterface[];

    const messagesCounter = {} as {
      [UserId: string]: { user: UserInterface; send: number; received: number };
    };

    messages.forEach(m => {
      const msg = m as unknown as MessageInterface;
      if (m.isAnonymous) anonymous.push(msg);
      if (!m.isRead) unread.push(msg);

      const author = m.author as unknown as UserInterface;
      const receiver = m.receiver as unknown as UserInterface;
      const authorId = author._id.toString();
      const receiverId = receiver._id.toString();

      if (!(authorId in messagesCounter))
        messagesCounter[authorId] = { user: author, send: 0, received: 0 };

      if (!(receiverId in messagesCounter))
        messagesCounter[receiverId] = {
          user: receiver,
          send: 0,
          received: 0,
        };

      messagesCounter[authorId].send++;
      messagesCounter[receiverId].received++;
    });

    const _messageCounter = Object.values(messagesCounter);

    const topReceivers = [
      ..._messageCounter.sort((a, b) => b.received - a.received),
    ].splice(0, 10);
    const topSenders = [
      ..._messageCounter.sort((a, b) => b.send - a.send),
    ].splice(0, 10);

    return {
      totalMessageCount,
      anonymousCount: anonymous.length,
      unreadCount: unread.length,
      topReceivers,
      topSenders,
    };
  }
}
