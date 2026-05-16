import { Router } from "express";
import { userController } from "./users.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./users.validation";

const router = Router();

router.post(
  "/",
  validateRequest(userValidation.createUserValidationSchema),
  userController.createUser,
);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getSingleUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRoutes = router;
