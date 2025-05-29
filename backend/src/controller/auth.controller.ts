import { inject } from "inversify";
import TYPES from "../inversify/types";
import { IUserService } from "../services/user.service.interface";
import { IAuthController } from "./auth.controller.interface";
import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class AuthController implements IAuthController {
  constructor(@inject(TYPES.UserService) private userService: IUserService) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = await this.userService.register(name, email, password);
    res.status(StatusCodes.CREATED).json({ user });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const tokens = await this.userService.login(email, password);
    res.status(StatusCodes.OK).json(tokens);
  });

  refresh = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const tokens = await this.userService.refreshToken(refreshToken);
    res.status(StatusCodes.OK).json(tokens);
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user?.userId) {
      throw new UnauthorizedError("User ID not found");
    }
    await this.userService.logout(req.user.userId);
    res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
  });
}
