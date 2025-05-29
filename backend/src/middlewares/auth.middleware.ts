import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { JwtUtil, TokenPayload } from "../utils/jwt";

declare module "express-serve-static-core" {
  interface Request {
    user?: TokenPayload;
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new UnauthorizedError("No token provided");
  }
  
  try {
    const payload = JwtUtil.verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid token");
  }
};
