import type { ZodType } from "zod";
import type {
  TNextFunction,
  TRequest,
  TResponse,
} from "../../shared/types/express.types";
import { asyncHandler } from "../../shared/utils/asyncHandler";

export const validateRequest = (schema: ZodType) => {
  return asyncHandler(
    async (req: TRequest, res: TResponse, next: TNextFunction) => {
      await schema.parseAsync(req.body);
      next();
    },
  );
};
