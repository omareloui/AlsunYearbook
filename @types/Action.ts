import { User } from ".";

export interface Action {
  signature: User;
  action: string;
  affected?: User;
  createdAt: Date;
}
