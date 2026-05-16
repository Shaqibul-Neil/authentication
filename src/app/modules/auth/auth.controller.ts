import type { TRequest, TResponse } from "../../../shared/types/express.types";
import { asyncHandler } from "../../../shared/utils/asyncHandler";
import { sendResponse } from "../../../shared/utils/sendResponse";
import { authServices } from "./auth.service";

const loginUser = asyncHandler(async (req: TRequest, res: TResponse) => {
  const result = await authServices.loginUserIntoDB(req.body);
  return sendResponse({
    res,
    success: true,
    message: "User logged in successfully",
    data: result,
    status: 200,
  });
});

export const authController = {
  loginUser,
};
