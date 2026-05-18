import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  node_env: process.env.NODE_ENV || "development",
  connectionString: process.env.CONNECTION_STRING,
  port: process.env.PORT || 5000,
  access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
};

export default config;
