import type { IncomingMessage, ServerResponse } from "http";

export type APIFunction = (_req: IncomingMessage, _res: ServerResponse) => any;
