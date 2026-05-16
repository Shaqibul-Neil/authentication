import { AppError } from "../../../shared/utils/appError";
import { usersModel } from "./users.models";
import { userValidation, type IUser } from "./users.validation";

const createUserIntoDB = async (payload: IUser) => {
  const result = await usersModel.createUser(payload);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await usersModel.getAllUsers();
  if (!result) throw new AppError("User data not found", 404);
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await usersModel.getSingleUser(id);
  if (!result) throw new AppError("User not found", 404);
  return result;
};

const updateUserInDB = async (id: string, payload: Partial<IUser>) => {
  const result = await usersModel.updateUser(id, payload);
  if (!result) throw new AppError("User not found", 404);
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await usersModel.deleteUser(id);
  if (!result) throw new AppError("User not found", 404);
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
