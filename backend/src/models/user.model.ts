import { Schema, model, Document } from "mongoose";

export interface IUser extends Document<string> {
  email: string;
  password: string;
  name: string;
  refreshTokenVersion: number;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    refreshTokenVersion: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User;
