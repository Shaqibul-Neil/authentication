export class AppError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    //for cleaner error stack
    Error.captureStackTrace(this, this.constructor);
  }
}
