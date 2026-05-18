import { Router } from "express";
import { authController } from "./auth.controller";
import { loginValidation } from "./auth.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { authentication } from "../../middlewares/authentication";

const router = Router();
router.post(
  "/login",
  validateRequest(loginValidation.loginUserValidationSchema),
  authController.loginUser,
);
router.post("/refresh-token", authController.refreshToken);
export const authRoutes = router;
