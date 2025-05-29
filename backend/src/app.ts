import express, { NextFunction, Request, Response } from "express";
import errorHandler from "./middlewares/errorHandler";
import { StatusCodes } from "http-status-codes";
import { MESSAGES } from "./constants/messages";
import { NotFoundError } from "./errors/NotFoundError";

const app = express();

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ status: MESSAGES.OK });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export default app;
