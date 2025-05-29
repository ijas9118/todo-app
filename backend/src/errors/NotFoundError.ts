import { StatusCodes } from "http-status-codes";
import { MESSAGES } from "../constants/messages";
import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  constructor(message = MESSAGES.NOT_FOUND) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
