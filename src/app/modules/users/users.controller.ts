import type { TRequest, TResponse } from "../../../shared/types/express.types";
import { asyncHandler } from "../../../shared/utils/asyncHandler";
import { sendResponse } from "../../../shared/utils/sendResponse";
import { userServices } from "./users.service";

//POST USERS
const createUser = asyncHandler(async (req: TRequest, res: TResponse) => {
  const result = await userServices.createUserIntoDB(req.body);
  return sendResponse({
    res,
    success: true,
    message: "User created successfully",
    data: result,
    status: 200,
  });
});

//GET users
const getAllUsers = asyncHandler(async (req: TRequest, res: TResponse) => {
  console.log(req.user);
  const result = await userServices.getAllUsersFromDB();

  sendResponse({
    res,
    success: true,
    message: "User Fetched Successfully",
    data: result,
    status: 200,
  });
});

//GET single users
const getSingleUser = asyncHandler(async (req: TRequest, res: TResponse) => {
  const { id } = req.params;
  const result = await userServices.getSingleUserFromDB(id as string);
  // if (!result) throw new AppError("User not found", 404);

  sendResponse({
    res,
    success: true,
    message: "User Fetched Successfully",
    data: result,
    status: 200,
  });
});

//UPDATE users
const updateUser = asyncHandler(async (req: TRequest, res: TResponse) => {
  const { id } = req.params;
  const result = await userServices.updateUserInDB(id as string, req.body);
  // if (!result) throw new AppError("User not found", 404);
  sendResponse({
    res,
    success: true,
    message: "User Updated Successfully",
    data: result,
    status: 200,
  });
});

//DELETE users
const deleteUser = asyncHandler(async (req: TRequest, res: TResponse) => {
  const { id } = req.params;
  const result = await userServices.deleteUserFromDB(id as string);
  //if (!result) throw new AppError("User not found", 404);
  sendResponse({
    res,
    success: true,
    message: "User Deleted Successfully",
    data: result,
    status: 200,
  });
});

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
