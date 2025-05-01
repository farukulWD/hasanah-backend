import mongoose, { Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,

      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["admin", "user", "superAdmin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
  const user = this as IUser;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.BYCRIPT_SALT_ROUNDS)
  );

  next();
});
// Static method to find user by mobile number or email, check if props is email then find by email otherwise find by mobile number
userSchema.statics.userFindByEmailOrMobile = async function (value: string) {
  const user = await this.findOne({
    $or: [{ email: value }, { mobile: value }],
  }).select("+password");
  return user;
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = mongoose.model<IUser, UserModel>(
  "User",
  userSchema,
  "users"
);
