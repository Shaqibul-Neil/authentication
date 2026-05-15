import type { TResponse } from "../types/express.types";

type TSendResponse<T> = {
  res: TResponse;
  status: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
};

export const sendResponse = <T>({
  res,
  status = 200,
  success,
  message = "Success",
  data,
  meta,
}: TSendResponse<T>) => {
  res.status(status).json({
    success,
    message,
    data,
    meta,
  });
};
