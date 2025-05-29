// config/env.ts
import * as dotenv from "dotenv";
import { cleanEnv, str, port, num } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  NODE_ENV: str({ choices: ["development", "production"] }),
  REDIS_URL: str(),
  JWT_ACCESS_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
  JWT_ACCESS_EXPIRY: num(),
  JWT_REFRESH_EXPIRY: num(),
  MONGODB_URI: str(),
});
