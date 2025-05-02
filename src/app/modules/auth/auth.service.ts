import AppError from "../../errors/AppError";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import e from "express";
import { sendEmail } from "../../utils/sendEmail";

// This function is used to login a user

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.userFindByEmailOrMobile(payload?.emailOrMobile);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "inactive") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is inactive ! !");
  }

  // checking if the user is deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted ! !");
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  //create token and sent to the  client

  if (!user._id) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "User ID is missing");
  }

  if (!user._id) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "User ID is missing");
  }

  const jwtPayload = {
    userId: user._id as string,
    emailOrMobile: user?.mobile,
    role: user?.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_SECRET as string,
    config.JWT_EXPIRATION as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRATION as string
  );

  //update refresh token to the database
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { refreshToken: refreshToken },
    { new: true, upsert: true }
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

// This function is used to logout a user
const logoutUser = async (userId: string) => {
  // Find the user by ID and update the refresh token to null
  const user = await User.findByIdAndUpdate(
    userId,
    { refreshToken: null },
    { new: true }
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};

// This function is used to refresh the access token

const refreshAccessToken = async (refreshToken: string) => {
  // Verify the refresh token
  const decoded = verifyToken(
    refreshToken,
    config.JWT_REFRESH_SECRET as string
  );

  // Find the user by ID and check if the refresh token matches
  const user = await User.findById(decoded.userId).select("+refreshToken");

  if (!user || user.refreshToken !== refreshToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
  }

  const findUser = await User.findById(user._id);

  // Create a new access token
  const jwtPayload = {
    userId: user._id,
    emailOrMobile: user?.mobile,
    role: user?.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_SECRET as string,
    config.JWT_EXPIRATION as string
  );

  return { accessToken, user: findUser };
};

// This function is used to forget password
const forgetPassword = async (emailOrMobile: string) => {
  // checking if the user is exist
  const user = await User.userFindByEmailOrMobile(emailOrMobile);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "inactive") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is inactive ! !");
  }

  // checking if the user is deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted ! !");
  }

  // if user give email then send forgot password link to email otherwise send otp to mobile number

  if (emailOrMobile.includes("@")) {
    // generate token with expiry time of 10 minutes

    if (!user._id) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "User ID is missing"
      );
    }

    const jwtPayload = {
      userId: user._id,
      emailOrMobile: user?.mobile,
      role: user?.role as string,
    };

    const token = createToken(jwtPayload, config.JWT_SECRET as string, "10m");

    // send email to user with the link to reset password
    sendEmail(
      user.email,
      `Click on this link to reset your password: ${config.CLIENT_URL}/reset-password/${token}`
    );
  } else {
    // send otp to user mobile number
    // generate otp and save to database and set expiry time for otp

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { otp: otp, otpExpiry: otpExpiry },
      { new: true, upsert: true }
    );

    // send otp to user mobile number
    // sendOtpToMobileNumber(user.mobile, otp);

    if (!updatedUser) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "User ID is missing"
      );
    }

    return updatedUser;
  }
};

// This function is used to verify otp

const verifyOtp = async (userId: string, otp: string) => {
  // checking if the user is exist
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "inactive") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is inactive ! !");
  }

  // checking if the user is deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted ! !");
  }

  // checking if the otp is correct and not expired
  if (user.otp !== otp) {
    throw new AppError(httpStatus.FORBIDDEN, "Otp do not matched");
  }

  const currentTime = new Date();

  if (!user?.otpExpire || user.otpExpire < currentTime) {
    throw new AppError(httpStatus.FORBIDDEN, "Otp is expired");
  }

  return true;
};

// This function is used to reset password
const resetPassword = async (
  userId: string,
  newPassword: string,
  token?: string
) => {
  // checking if the user is exist
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "inactive") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is inactive ! !");
  }
  // checking if the user is deleted

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted ! !");
  }
  // checking if the password is same as old password
  if (await User.isPasswordMatched(newPassword, user?.password)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "New password should not be same as old password"
    );
  }

  // if token is provided then verify the token and reset password
  if (token) {
    const decoded = verifyToken(token, config.JWT_SECRET as string);
    if (decoded.userId !== userId) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
    }

    // check if the token is expired
    if (!decoded.exp) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Token expiration is missing"
      );
    }
    const tokenExpiry = new Date(decoded.exp * 1000);
    if (tokenExpiry < new Date()) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Token is expired");
    }
  }

  // hashing the password and saving to database
  const hashedPassword = await User.hashPassword(newPassword);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true, upsert: true }
  );
  if (!updatedUser) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "User ID is missing");
  }
  return updatedUser;
};

// change password
const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  // checking if the user is exist
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "inactive") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is inactive ! !");
  }
  // checking if the user is deleted

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted ! !");
  }
  // checking if the password is same as old password
  if (!(await User.isPasswordMatched(oldPassword, user?.password))) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your Current password is not correct"
    );
  }

  // hashing the password and saving to database
  const hashedPassword = await User.hashPassword(newPassword);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true, upsert: true }
  );

  return updatedUser;
};

export const AuthService = {
  loginUser,
  logoutUser,
  refreshAccessToken,
  forgetPassword,
  verifyOtp,
  resetPassword,
  changePassword,
  
};
