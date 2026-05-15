import type {
  TNextFunction,
  TRequest,
  TResponse,
} from "../types/express.types";

type TController = (req: TRequest, res: TResponse) => Promise<void>;

export const asyncHandler = (controller: TController) => {
  return async (req: TRequest, res: TResponse, next: TNextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
};
