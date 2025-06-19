import cookieParser from "cookie-parser";
import express from "express";
import authRoutes from "./features/auth/routes.ts";
import healthRoutes from "./features/health/routes.ts";
import loansRoutes from "./features/loans/routes.ts";
import { errorHandlerMiddleware, requestLoggerMiddleware } from "./middlewares/index.ts";
import { decodeAccessToken } from "./features/auth/middleware.ts";
import { getConfig } from "./config.ts";

const config = getConfig()
const app = express();

app.use(express.json()); // parsing json req bodies
app.use(cookieParser(config.cookieSecret));
app.use(decodeAccessToken)  // attaches user to req
app.use(requestLoggerMiddleware);

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/loans", loansRoutes);

app.use(errorHandlerMiddleware);

export default app;
