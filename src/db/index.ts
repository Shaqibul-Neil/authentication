import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connectionString,
});

export const initDB = async () => {
  try {
    //Users table
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(30),
        email VARCHAR(30) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        role VARCHAR(10) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )`,
    );
    console.log("Users table ready ✅");
    //Profile table
    // references with user table by id and it must be unique cz one user has one profile -- 1to1 relation but user post is 1to many. also using cascade we are deleting profile when user is deleted from user table
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS profiles(
      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE, 
      bio TEXT,
      address TEXT,
      phone VARCHAR(11),
      gender VARCHAR(6),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      `,
    );
    console.log("Profiles table ready ✅");
  } catch (error) {
    console.error("DB INIT ERROR:", error);
    process.exit(1);
  }
};
