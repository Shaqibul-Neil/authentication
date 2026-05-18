import { Router } from "express";
import { userController } from "./users.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./users.validation";
import { authentication } from "../../middlewares/authentication";
import { USER_ROLE } from "../../../shared/types";

const router = Router();

router.post(
  "/",
  validateRequest(userValidation.createUserValidationSchema),
  userController.createUser,
);
router.get("/", authentication(USER_ROLE.admin), userController.getAllUsers);
router.get("/:id", userController.getSingleUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRoutes = router;
