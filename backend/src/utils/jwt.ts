import jwt from "jsonwebtoken";
import { env } from "@/config/env";

export interface TokenPayload {
  userId: string;
  email: string;
}

export class JwtUtil {
  static signAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: env.JWT_ACCESS_EXPIRY,
    });
  }

  static signRefreshToken(payload: TokenPayload, version: number): string {
    return jwt.sign({ ...payload, version }, env.JWT_REFRESH_SECRET as string, {
      expiresIn: env.JWT_REFRESH_EXPIRY,
    });
  }

  static verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, env.JWT_ACCESS_SECRET as string) as TokenPayload;
  }

  static verifyRefreshToken(token: string): TokenPayload & { version: number } {
    return jwt.verify(token, env.JWT_REFRESH_SECRET as string) as TokenPayload & { version: number };
  }
}
