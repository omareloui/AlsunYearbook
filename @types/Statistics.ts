import type { User, UserRole, UserAuthority } from ".";

export interface UsersStatistics {
  rolesCount: { [K in UserRole]: number };
  authorityRoleCount: { [K in UserAuthority]: number };
  totalUsersCount: number;
  notRegisteredCount: number;
}

export interface CloseFriendsStatistics {
  totalRecordsCount: number;
  topHasCloseFriends: {
    user: User;
    hasCloseFriend: number;
    isCloseFriend: number;
  }[];
  topIsCloseFriends: {
    user: User;
    hasCloseFriend: number;
    isCloseFriend: number;
  }[];
}

export interface MessagesStatistics {
  totalMessageCount: number;
  anonymousCount: number;
  unreadCount: number;
  topReceivers: { user: User; send: number; received: number }[];
  topSenders: { user: User; send: number; received: number }[];
}

export interface Statistics {
  users: UsersStatistics;
  closeFriends: CloseFriendsStatistics;
  messages: MessagesStatistics;
}
