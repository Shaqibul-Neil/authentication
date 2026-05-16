import { authModels } from "./auth.models";
import type { ILoginUser } from "./auth.validation";

const loginUserIntoDB = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const result = await authModels.loginUser({ email, password });
  return result;
};

export const authServices = {
  loginUserIntoDB,
};
