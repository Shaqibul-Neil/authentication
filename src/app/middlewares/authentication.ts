import jwt, { type JwtPayload } from "jsonwebtoken";
import type {
  TRequest,
  TResponse,
  TNextFunction,
} from "../../shared/types/express.types";
import { AppError } from "../../shared/utils/appError";
import config from "../../config";
import { pool } from "../../db";

export const authentication = (...roles: string[]) => {
  return async (req: TRequest, res: TResponse, next: TNextFunction) => {
    try {
      console.log(roles);
      //Check if token exists
      const token = req.headers.authorization;
      console.log(token);
      if (!token) {
        throw new AppError("Unauthorized", 401);
      }

      //decode adn verify the token
      const decoded = jwt.verify(
        token as string,
        config.secret as string,
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

      if (roles.length && user.role && !roles.includes(user.role))
        throw new AppError("Forbidden", 403);

      req.user = decoded; //req:{user:{}}
      next();
    } catch (error) {
      next(error);
    }
  };
};
