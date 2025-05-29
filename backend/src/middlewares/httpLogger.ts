import { Request, Response, NextFunction } from "express";
import logger from "@/utils/logger";

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

    const userId = (req as any).user?._id || "anonymous"; // Modify if using custom auth

    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration} ms | user: ${userId}`;

    logger.http(logMessage);
  });

  next();
};
