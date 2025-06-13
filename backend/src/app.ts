import express from "express";
import healthRoutes from "./features/health/api";

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);

export default app;
