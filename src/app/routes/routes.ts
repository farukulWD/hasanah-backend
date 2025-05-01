import { Router } from "express";
import { userRouter } from "../modules/users/user.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
];

modulesRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
