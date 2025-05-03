import { Router } from "express";
import { volunteerController } from "./volunteer.controller";
import validateRequest from "../../middlewares/validatedRequest";
import { volunteerApplicationValidationSchema } from "./volunteer.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.constance";

const router = Router();

// Register a volunteer (public)
router.post(
  "/register-volunteer",
  validateRequest(volunteerApplicationValidationSchema),
  volunteerController.registerVolunteer
);

// Get all volunteers (admin or superAdmin)
router.get(
  "/get-all-volunteers",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  volunteerController.getAllVolunteers
);

// Get single volunteer by ID (admin or superAdmin)
router.get(
  "/get-single-volunteer/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  volunteerController.getSingleVolunteer
);

// Update volunteer by ID (admin or superAdmin)
router.patch(
  "/update-volunteer/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  volunteerController.updateVolunteer
);

// Delete volunteer by ID (admin or superAdmin)
router.delete(
  "/delete-volunteer/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  volunteerController.deleteVolunteer
);

export const VolunteerRoutes = router;
