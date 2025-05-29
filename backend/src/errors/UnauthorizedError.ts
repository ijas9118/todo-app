import { StatusCodes } from "http-status-codes";
import { AppError } from "./AppError";
import { MESSAGES } from "@/constants/messages";

export class UnauthorizedError extends AppError {
  constructor(message = MESSAGES.UNAUTHORIZED) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
