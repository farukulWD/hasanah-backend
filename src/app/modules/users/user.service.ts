import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import httpStatus from "http-status";
import { User } from "./user.model";

const createUserService = async (userData: IUser) => {
  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, "User data is required");
  }

  if (!userData.name) {
    throw new AppError(httpStatus.BAD_REQUEST, "Name is required");
  }
  if (!userData.email || !userData.mobile) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email or Mobile is required");
  }

  if (!userData.password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is required");
  }

  const user = await User.create(userData);
  if (!user) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "User not created");
  }
  return user;
};

const getAllUsersService = async () => {
  const users = await User.find({}).select("-password").lean();
  if (!users) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Users not found");
  }
  return users;
};

const getSingleUserService = async (userId: string) => {
  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID is required");
  }

  const user = await User.findById(userId).select("-password").lean();
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const updateUserService = async (userId: string, userData: IUser) => {
  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID is required");
  }

  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, "User data is required");
  }

  const user = await User.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  })
    .select("-password")
    .lean();

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const deleteUserService = async (userId: string) => {
  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID is required");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    { new: true, runValidators: true }
  )
    .select("-password")
    .lean();
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

export const userServices = {
  createUserService,
  getAllUsersService,
  getSingleUserService,
  updateUserService,
  deleteUserService,
};
