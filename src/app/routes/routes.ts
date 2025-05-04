import { Router } from "express";
import { userRouter } from "../modules/users/user.route";
import { authRouter } from "../modules/auth/auth.route";
import { projectRoutes } from "../modules/project/project.routes";
import { blogRoutes } from "../modules/blog/blog.route";
import { VolunteerRoutes } from "../modules/volunteer/volunteer.route";
import { donationRoutes } from "../modules/donation/donation.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/project",
    route: projectRoutes,
  },
  {
    path: "/blog",
    route: blogRoutes,
  },
  {
    path: "/volunteer",
    route: VolunteerRoutes,
  },
  {
    path: "/donation",
    route: donationRoutes,
  },
];

modulesRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
