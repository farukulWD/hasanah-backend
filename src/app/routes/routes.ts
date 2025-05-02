import { Router } from "express";
import { userRouter } from "../modules/users/user.route";
import { authRouter } from "../modules/auth/auth.route";

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
];

modulesRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
