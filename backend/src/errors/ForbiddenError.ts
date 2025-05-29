import { StatusCodes } from "http-status-codes";
import { AppError } from "./AppError";
import { MESSAGES } from "../constants/messages";

export class ForbiddenError extends AppError {
  constructor(message = MESSAGES.FORBIDDEN) {
    super(message, StatusCodes.FORBIDDEN);
  }
}
