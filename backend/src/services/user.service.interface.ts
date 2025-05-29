import { IUser } from "../models/user.model";

export interface IUserService {
  register(name: string, email: string, password: string): Promise<IUser>;
  login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }>;
  refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }>;
  logout(userId: string): Promise<void>;
}
