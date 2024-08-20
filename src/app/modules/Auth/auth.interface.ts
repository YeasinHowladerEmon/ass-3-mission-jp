import { Model } from "mongoose";
import { USER_ROLE } from "./auth.constant";

export type IUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  address: string;
};

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    normalPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type IUserRole = keyof typeof USER_ROLE;
