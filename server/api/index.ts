import express from "express";

import { connect as connectDB } from "~~/server/db";
import { router } from "~~/server/routes";

const app = express();

app.use(express.json());

app.use("/api", router);

connectDB();

export default {
  path: "/api",
  handler: app,
};
