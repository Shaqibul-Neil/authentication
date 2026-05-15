import type {
  TRequest,
  TResponse,
  TNextFunction,
} from "../../shared/types/express.types";
import type { AppError } from "../../shared/utils/appError";

export const globalErrorHandler = (
  err: AppError,
  req: TRequest,
  res: TResponse,
  next: TNextFunction,
) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};
