import type { IncomingMessage, ServerResponse } from "http";
import type { JWTContent } from "~~/@types";

export type APIFunction<T = any> = (
  req: IncomingMessage & Partial<JWTContent>,
  res: ServerResponse
) => T;
