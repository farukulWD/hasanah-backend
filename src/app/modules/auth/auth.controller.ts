import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, accessToken, user } = result;

  let cookieDomain: string | undefined = undefined;

  // if (config.NODE_ENV === 'production') {
  //   cookieDomain = '.tradeasiahrc.com';
  // }

  res.cookie("refreshToken", refreshToken, {
    //   secure: config.env === 'production',
    httpOnly: true,
    sameSite: "strict",
    //   domain: cookieDomain,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: {
      accessToken,
      user,
    },
  });
});

// This function is used to logout a user

const logoutUser = catchAsync(async (req, res) => {
  const { userId } = req?.user;
  const result = await AuthService.logoutUser(userId);
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    // domain: cookieDomain,
    secure: config.NODE_ENV === "production",
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged out successfully!",
    data: {},
  });
});

// This function is used to refresh the access token

const refreshAccessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshAccessToken(refreshToken);
  const { accessToken, user } = result;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token is refreshed successfully!",
    data: {
      accessToken,
      user,
    },
  });
});

// This function is used to forgot password
const forgotPassword = catchAsync(async (req, res) => {
  const { emailOrPhone } = req.body;
  const result = await AuthService.forgetPassword(emailOrPhone);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset link sent successfully!",
    data: result,
  });
});

// this function is used to verify the otp
const verifyOtp = catchAsync(async (req, res) => {
  const { otp } = req.body;
  const { phone } = req.params;
  const result = await AuthService.verifyOtp(phone, otp);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Otp verified successfully!",
    data: result,
  });
});

// this function is used to reset the password
const resetPassword = catchAsync(async (req, res) => {
  const { password, token } = req.body;
  const { emailOrPhone } = req.params;
  const result = await AuthService.resetPassword(emailOrPhone, password, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully!",
    data: result,
  });
});

// this function is used to change the password
const changePassword = catchAsync(async (req, res) => {
  const { oldPassword, password } = req.body;
  const { userId } = req.user;
  const result = await AuthService.changePassword(
    userId,
    password,
    oldPassword
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully!",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  logoutUser,
  refreshAccessToken,
  forgotPassword,
  verifyOtp,
  resetPassword,
  changePassword,
};
