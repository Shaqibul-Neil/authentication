import { Router } from "express";
import { authController } from "./auth.controller";
import { loginValidation } from "./auth.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();
router.post(
  "/login",
  validateRequest(loginValidation.loginUserValidationSchema),
  authController.loginUser,
);
export const authRoutes = router;
