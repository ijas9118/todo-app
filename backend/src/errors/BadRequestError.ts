import { StatusCodes } from "http-status-codes";
import { AppError } from "./AppError";
import { MESSAGES } from "../constants/messages";

export class BadRequestError extends AppError {
  constructor(message = MESSAGES.BAD_REQUEST) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
