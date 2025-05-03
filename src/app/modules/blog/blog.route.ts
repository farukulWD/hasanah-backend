import { NextFunction, Request, Response, Router } from "express";
import { blogController } from "./blog.controller";
import { upload } from "../../utils/sendImageToCloudinary";
import validateRequest from "../../middlewares/validatedRequest";
import { blogValidationSchema } from "./blog.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.constance";

const router = Router();

router.post(
  "/create-blog",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.blogData);
    next();
  },
  validateRequest(blogValidationSchema),
  blogController.createBlog
);
router.get("/get-all-blogs", blogController.getAllBlogs);

router.patch(
  "/update-blog/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.blogData);

    next();
  },

  blogController.updateBlog
);

router.delete(
  "/delete-blog/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  blogController.deleteBlog
);

router.get("/single-blog/:id", blogController.getSingleBlog);

export const blogRoutes = router;
