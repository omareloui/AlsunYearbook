import type { IncomingMessage, ServerResponse } from "http";
import type { JWTContent } from "~~/@types";

export type APIRequest = IncomingMessage & Partial<JWTContent>;
export type APIResponse = ServerResponse;

export type APIFunction<T = any> = (req: APIRequest, res: APIResponse) => T;
