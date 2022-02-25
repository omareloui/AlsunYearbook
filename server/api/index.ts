import express from "express";

import { connect as connectDB } from "~~/server/db";

const app = express();

app.use(express.json());

connectDB();

export default {
  path: "/api",
  handler: app,
};
