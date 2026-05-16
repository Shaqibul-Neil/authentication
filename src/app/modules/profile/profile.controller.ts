import type { TRequest, TResponse } from "../../../shared/types/express.types";
import { asyncHandler } from "../../../shared/utils/asyncHandler";
import { sendResponse } from "../../../shared/utils/sendResponse";
import { profileServices } from "./profile.service";

const createProfile = asyncHandler(async (req: TRequest, res: TResponse) => {
  const result = await profileServices.createProfileInDB(req.body);
  return sendResponse({
    res,
    success: true,
    message: "Profile created successfully",
    data: result,
    status: 200,
  });
});

export const profileController = {
  createProfile,
};
