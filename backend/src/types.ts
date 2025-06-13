import type { Request, Response } from "express";

export type TypedRequest<T> = Request<unknown, unknown, T>;
export type TypedResponse<T> = Response<T>;
