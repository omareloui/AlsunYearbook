import { Document, Types } from "mongoose";
import { User } from ".";

export interface ActionAffectedField {
  field: string;
  from: string;
  to: string;
}

export interface PopulatedActionAffected {
  user?: User;
  fields?: ActionAffectedField[];
}

export interface ActionAffected {
  user?: Types.ObjectId;
  fields?: ActionAffectedField[];
}

export interface DehydratedAction {
  signature: Types.ObjectId;
  action: string;
  affected?: ActionAffected;
}

export interface Action extends Document {
  signature: User;
  action: string;
  affected?: PopulatedActionAffected;
  createdAt: Date;
  updatedAt: Date;
}
