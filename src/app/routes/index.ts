import { Router } from "express";
import { userRoutes } from "../modules/users/users.routes";

const appRouter = Router();
const moduleRoutes = [{ path: "/users", route: userRoutes }];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));

export default appRouter;
