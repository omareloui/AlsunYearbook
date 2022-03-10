import { User } from ".";

export interface ActionAffectedField {
  field: string;
  from: string;
  to: string;
}

export interface ActionAffected {
  user?: User;
  fields?: ActionAffectedField[];
}

export interface Action {
  signature: User;
  action: string;
  affected?: ActionAffected;
  createdAt: Date;
}
