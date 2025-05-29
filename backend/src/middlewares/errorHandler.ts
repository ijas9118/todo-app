import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { StatusCodes } from "http-status-codes";
import { MESSAGES } from "../constants/messages";
import { env } from "process";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  logger.error(`[${req.method}] ${req.url} - ${err.message}`);

  res.status(statusCode).json({
    message: err.message || MESSAGES.INTERNAL_ERROR,
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
