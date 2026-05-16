import { Router } from "express";
import { userRoutes } from "../modules/users/users.routes";
import { profileRoutes } from "../modules/profile/profile.route";
import { authRoutes } from "../modules/auth/auth.route";

const appRouter = Router();
const moduleRoutes = [
  { path: "/auth", route: authRoutes },
  { path: "/users", route: userRoutes },
  { path: "/profiles", route: profileRoutes },
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));

export default appRouter;
