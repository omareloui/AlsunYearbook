import type { IncomingMessage, ServerResponse } from "http";

export type APIFunction<T = any> = (
  _req: IncomingMessage,
  _res: ServerResponse
) => T;
