import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validatedRequest";
import { AuthValidation } from "./auth.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.constance";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);
router.post(
  "/logout",
  auth(USER_ROLE?.user, USER_ROLE?.admin, USER_ROLE?.superAdmin),
  AuthController.logoutUser
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshAccessToken
);

router.post("/forgot-password", AuthController.forgotPassword);
router.post("/:phone/verify-otp", AuthController.verifyOtp);
router.post("/:emailOrPhone/reset-password", AuthController.resetPassword);
router.post(
  "/change-password",
  auth(USER_ROLE?.user, USER_ROLE?.admin, USER_ROLE?.superAdmin),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword
);

export const authRouter = router;
