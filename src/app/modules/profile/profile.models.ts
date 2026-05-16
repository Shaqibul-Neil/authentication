import { pool } from "../../../db";
import { AppError } from "../../../shared/utils/appError";
import type { IProfile } from "./profile.interface";

const createProfile = async (payload: IProfile) => {
  const { user_id, bio, address, phone, gender } = payload;

  const user = await pool.query(
    `
      SELECT * FROM users WHERE id = $1
    `,
    [user_id],
  );

  if (user.rows.length === 0) throw new AppError("User not found", 400);

  const result = await pool.query(
    `
    INSERT INTO profiles
    (user_id, bio, address, phone, gender)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [user_id, bio, address, phone, gender],
  );

  return result.rows[0];
};

export const profileModels = {
  createProfile,
};
