import { pool } from "../../../db";
import type { IUser } from "./users.validation";

const createUser = async (payload: IUser) => {
  const { name, email, password, age } = payload;
  const result = await pool.query(
    `
    INSERT INTO users 
    (name, email, password, age) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *
    `,
    [name, email, password, age],
  );
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query(
    `
    SELECT * FROM users
    `,
  );
  return result.rows;
};

const getSingleUser = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users 
    WHERE id = $1`,
    [id],
  );
  return result.rows[0];
};

const updateUser = async (id: string, payload: Partial<IUser>) => {
  const { name, password, age } = payload;
  const result = await pool.query(
    `UPDATE users 
     SET 
     name = COALESCE($1, name), 
     password = COALESCE($2, password), 
     age = COALESCE($3, age), 
     is_active = COALESCE($4, is_active),
     updated_at = NOW()
     WHERE id = $5 RETURNING *`,
    [name, password, age, id],
  );
  return result.rows[0];
};

const deleteUser = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM users 
    WHERE id = $1 
    RETURNING *`,
    [id],
  );
  return result.rows[0];
};

export const usersModel = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
