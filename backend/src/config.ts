import dotenv from "dotenv";

dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`${key} is not defined in environment variables`);
  return value;
}

// TODO: cache
export const getConfig = () => ({
  port: Number.parseInt(process.env.PORT || "3000", 10),
  cookieSecret: getEnv("COOKIE_SECRET"),
  accessTokenSecret: getEnv("ACCESS_TOKEN_SECRET"),
  refreshTokenSecret: getEnv("REFRESH_TOKEN_SECRET"),
  nodeEnv: process.env.NODE_ENV || "development",
});
