import jwt, { type JwtPayload } from "jsonwebtoken";
import type {
  TRequest,
  TResponse,
  TNextFunction,
} from "../../shared/types/express.types";
import { AppError } from "../../shared/utils/appError";
import config from "../../config";
import { pool } from "../../db";

export const authentication = () => {
  return async (req: TRequest, res: TResponse, next: TNextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError("Unauthorized", 401);
    }

    const decoded = jwt.verify(
      token as string,
      config.secret as string,
    ) as JwtPayload;
    if (!decoded) throw new AppError("Unauthorized", 401);

    const userData = await pool.query(
      `
        SELECT * FROM users WHERE email = $1
        `,
      [decoded.email],
    );
    if (userData.rows.length === 0) throw new AppError("User not Found", 404);

    const user = userData.rows[0];
    if (!user.is_active) throw new AppError("Forbidden", 403);

    next();
  };
};
