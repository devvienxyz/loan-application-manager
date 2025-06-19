import dotenv from "dotenv";

dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`${key} is not defined in environment variables`);
  return value;
}

const isProd = `${process.env.NODE_ENV}` === "production";

// TODO: cache
export const getConfig = () => ({
  isProd,
  port: Number.parseInt(process.env.PORT || "3000", 10),
  cookieSecret: getEnv("COOKIE_SECRET"),
  accessTokenSecret: getEnv("ACCESS_TOKEN_SECRET"),
  refreshTokenSecret: getEnv("REFRESH_TOKEN_SECRET"),
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigins: isProd ? process.env.CORS_ORIGINS : ["http://localhost:5173"],
});
