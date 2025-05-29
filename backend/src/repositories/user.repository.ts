import { injectable } from "inversify";
import User, { IUser } from "@/models/user.model";
import { IUserRepository } from "./user.repository.interface";

@injectable()
export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async createUser(user: Partial<IUser>): Promise<IUser> {
    return User.create(user);
  }

  async incrementTokenVersion(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { $inc: { refreshTokenVersion: 1 } });
  }
}
