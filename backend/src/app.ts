import express from "express";
import healthRoutes from "./features/health/api";
import { errorHandlerMiddleware } from "./middlewares";

const app = express();

app.use(express.json()); // parsing json req bodies

app.use("/health", healthRoutes);

app.use(errorHandlerMiddleware);

export default app;
