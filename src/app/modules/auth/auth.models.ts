import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { ILoginUser } from "./auth.validation";
import { pool } from "../../../db";
import { AppError } from "../../../shared/utils/appError";
import config from "../../../config";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;
  //check if user exists
  const userData = await pool.query(
    `
    SELECT * FROM USERS WHERE email=$1
    `,
    [email],
  );
  console.log(userData);
  if (userData.rows.length === 0)
    throw new AppError("Invalid Credentials", 404);

  const user = userData.rows[0];
  //compare the password
  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) throw new AppError("Invalid Credentials", 401);

  //generate token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_active: user.is_active,
  };
  const accessToken = jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: "1h",
  });
  return { accessToken };
};

export const authModels = {
  loginUser,
};
