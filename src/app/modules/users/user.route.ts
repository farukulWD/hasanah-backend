import { Router } from "express";
import userController from "./user-controller";
import validateRequest from "../../middlewares/validatedRequest";
import { userValidationSchema } from "./user.validation";

const router = Router();

router.post(
  "/create-user",
  validateRequest(userValidationSchema),
  userController.createUser
);
router.get("/get-all-users", userController.getAllUsers);
router.get("/get-single-user/:id", userController.getSingleUser);
router.patch("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);

export const userRouter = router;
