import config from "../../../config";
import { pool } from "../../../db";
import { AppError } from "../../../shared/utils/appError";
import { authModels } from "./auth.models";
import type { ILoginUser } from "./auth.validation";
import jwt, { type JwtPayload } from "jsonwebtoken";

const loginUserIntoDB = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const result = await authModels.loginUser({ email, password });
  return result;
};

const generateRefreshToken = async (token: string) => {
  //Check if token exists
  console.log(token);
  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  //decode adn verify the token
  const decoded = jwt.verify(
    token as string,
    config.refresh_token_secret as string,
  ) as JwtPayload;
  if (!decoded) throw new AppError("Unauthorized", 401);

  //find the user from db
  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email = $1
        `,
    [decoded.email],
  );
  if (userData.rows.length === 0) throw new AppError("User not Found", 404);

  //if the user is active or not
  const user = userData.rows[0];
  if (!user.is_active) throw new AppError("Forbidden", 403);

  //generate token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_active: user.is_active,
    role: user.role,
  };
  console.log(user);
  const accessToken = jwt.sign(
    jwtPayload,
    config.access_token_secret as string,
    {
      expiresIn: "1D",
    },
  );
  return { accessToken };
};

export const authServices = {
  loginUserIntoDB,
  generateRefreshToken,
};
