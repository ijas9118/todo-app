import { StatusCodes } from "http-status-codes";
import { AppError } from "./AppError";
import { MESSAGES } from "@/constants/messages";

export class ConflictError extends AppError {
  constructor(message = MESSAGES.CONFICT) {
    super(message, StatusCodes.CONFLICT);
  }
}
