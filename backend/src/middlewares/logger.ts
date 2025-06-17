import type { Request, Response, NextFunction } from "express";

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const { method, originalUrl, ip } = req;
	const start = Date.now();

	console.info(`[REQ] ${method} ${originalUrl} - ${ip}`);

	res.on("finish", () => {
		const duration = Date.now() - start;
		const { statusCode } = res;

		console.info(`[RES] ${method} ${originalUrl} ${statusCode} - ${duration}ms`);
	});

	next();
};
