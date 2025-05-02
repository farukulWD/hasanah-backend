import { NextFunction, Request, Response, Router } from "express";
import { projectController } from "./project.controller";
import { upload } from "../../utils/sendImageToCloudinary";
import validateRequest from "../../middlewares/validatedRequest";
import { projectValidation } from "./project.validation";

const router = Router();

router.post(
  "/create-project",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.projectData);
    next();
  },
  validateRequest(projectValidation),
  projectController.createProject
);
router.get("/get-all-projects", projectController.getAllProjects);
router.get("/get-project/:id", projectController.getProjectById);
router.patch("/update-project/:id", projectController.updateProject);
router.delete("/delete-project/:id", projectController.deleteProject);

export const projectRoutes = router;
