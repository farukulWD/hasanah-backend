import { Model } from "mongoose";
import { USER_ROLE } from "./user.constance";

export interface IUser extends Document {
  _id?: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  
  isDeleted?: boolean;
  role?: "admin" | "user" | "superAdmin";
  status?: "active" | "inactive";
  isEmailVerified?: boolean;
  isMobileVerified?: boolean;
  otp?: string;
  otpExpire?: Date;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<IUser> {
  userFindByEmailOrMobile(mobile: string): Promise<IUser | null>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;


  hashPassword(plainTextPassword: string): Promise<string>;
}

export type TUserRole = keyof typeof USER_ROLE;
