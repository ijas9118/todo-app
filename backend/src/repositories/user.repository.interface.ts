import { IUser } from "../models/user.model";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  createUser(user: Partial<IUser>): Promise<IUser>;
  incrementTokenVersion(userId: string): Promise<void>;
}
