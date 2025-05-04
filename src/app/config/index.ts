import dotenv from "dotenv";
import path from "path";

const envPath =
  process.env.NODE_ENV === "production"
    ? path.join(process.cwd(), ".env.production")
    : path.join(process.cwd(), ".env");

dotenv.config({ path: envPath });

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/myapp",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
  MULTER_CLOUD_NAME: process.env.MULTER_CLOUD_NAME,
  MULTER_API_KEY: process.env.MULTER_API_KEY,
  MULTER_API_SECRET: process.env.MULTER_API_SECRET,
  BYCRIPT_SALT_ROUNDS: process.env.BYCRYPT_SALT_ROUNDS,
  CLIENT_URL: process.env.CLIENT_URL,
  // sslEcommace
  store_id: process.env.store_id,
  store_passwd: process.env.store_passwd,
  is_live: process.env.is_live,
};
