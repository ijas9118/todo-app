import { inject, injectable } from "inversify";
import { IUserService } from "./user.service.interface";
import TYPES from "../inversify/types";
import { IUserRepository } from "../repositories/user.repository.interface";
import { IUser } from "../models/user.model";
import { ConflictError } from "../errors/ConflictError";
import bcrypt from "bcryptjs";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { JwtUtil, TokenPayload } from "../utils/jwt";
import { redisClient } from "../utils/redisClient";

@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.UserRepository) private userRepo: IUserRepository) {}

  async register(name: string, email: string, password: string): Promise<IUser> {
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new ConflictError("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.userRepo.createUser({ name, email, password: hashedPassword });
    return user;
  }

  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const payload: TokenPayload = { userId: user._id, email: user.email };
    const accessToken = JwtUtil.signAccessToken(payload);
    const refreshToken = JwtUtil.signRefreshToken(payload, user.refreshTokenVersion);

    // Store refresh token in Redis with 7 days expiry
    await redisClient.setEx(`refresh_token:${user._id}`, 7 * 24 * 60 * 60, refreshToken);

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    let payload: TokenPayload & { version: number };
    try {
      payload = JwtUtil.verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const user = await this.userRepo.findByEmail(payload.email);
    if (!user || user.refreshTokenVersion !== payload.version) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const storedToken = await redisClient.get(`refresh_token:${user._id}`);
    if (storedToken !== refreshToken) {
      // Possible token reuse detected, invalidate all tokens
      await this.userRepo.incrementTokenVersion(user._id);
      await redisClient.del(`refresh_token:${user._id}`);
      throw new UnauthorizedError("Invalid refresh token");
    }

    // Generate new tokens
    const newPayload: TokenPayload = { userId: user._id.toString(), email: user.email };
    const newAccessToken = JwtUtil.signAccessToken(newPayload);
    const newRefreshToken = JwtUtil.signRefreshToken(newPayload, user.refreshTokenVersion);

    // Update refresh token in Redis
    await redisClient.setEx(`refresh_token:${user._id}`, 7 * 24 * 60 * 60, newRefreshToken);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(userId: string): Promise<void> {
    await this.userRepo.incrementTokenVersion(userId);
    await redisClient.del(`refresh_token:${userId}`);
  }
}
