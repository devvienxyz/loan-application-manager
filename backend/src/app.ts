import cookieParser from "cookie-parser";
import express from "express";
import { config } from "./config";
import authRoutes from "./features/auth/routes";
import healthRoutes from "./features/health/routes";
import { errorHandlerMiddleware } from "./middlewares";
import { decodeAccessToken } from "./features/auth/middleware";

const app = express();

app.use(express.json()); // parsing json req bodies
app.use(cookieParser(config.cookieSecret));
app.use(decodeAccessToken)  // attaches user to req

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);

app.use(errorHandlerMiddleware);

export default app;
