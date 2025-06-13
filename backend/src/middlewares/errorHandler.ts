import type { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
	statusCode?: number;
}

// Global error handling middleware
const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
	console.error(err);

	// Default to 500 Internal Server Error
	let statusCode = err.statusCode || 500;
	let message = err.message || "An unexpected error occurred.";

	// Handle specific error types if needed (e.g., database errors)
	if (err.name === "QueryFailedError") {
		statusCode = 500;
		message = "Database operation failed.";
	}

	res.status(statusCode).json({
		message: message,
		// hide stack trace in prod
		stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
	});
};

export default errorHandler;
