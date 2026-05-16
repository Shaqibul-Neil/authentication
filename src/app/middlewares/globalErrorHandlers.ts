import { ZodError } from "zod";
import config from "../../config";
import type {
  TRequest,
  TResponse,
  TNextFunction,
} from "../../shared/types/express.types";
import { AppError } from "../../shared/utils/appError";

export const globalErrorHandler = (
  err: any,
  req: TRequest,
  res: TResponse,
  next: TNextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";
  let errorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // Handling Zod Errors
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errorSources = err.issues.map((issue) => ({
      path: String(issue?.path[issue.path.length - 1]),
      message: issue.message,
    }));
  }
  // Custom App Error
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // Handling Postgres Unique Constraint (Example: Duplicate Email)
  else if (err.code === "23505") {
    statusCode = 400;
    message = "Duplicate Entry";
    errorSources = [{ path: "", message: err.detail }];
  }
  // Generic Error
  else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};
