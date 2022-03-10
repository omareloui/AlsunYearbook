import mongoose from "mongoose";
import { config } from "../config";

export const connect = () =>
  new Promise((res, rej) => {
    if (mongoose.connection.readyState === 1) return res(true);

    mongoose.connect(config.dbLink as string, err => {
      if (err) return rej(err);
      // console.log(`Connected to database on ${config.dbLink}`);
      return res(true);
    });
  });
