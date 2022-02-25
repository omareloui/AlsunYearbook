import mongoose from "mongoose";
import { config } from "../config";

export const connect = () =>
  new Promise((res, rej) =>
    mongoose.connect(config.dbLink as string, err => {
      if (err) rej(err);
      console.log(`Connected to database on ${config.dbLink}`);
      res(true);
    })
  );
