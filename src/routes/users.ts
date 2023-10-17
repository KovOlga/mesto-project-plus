import { Router } from "express";
import {
  validateAvatar,
  validateObjectId,
  validateUserData,
} from "../middlewares/validations";
import {
  getUsers,
  getUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} from "../controllers/users";

const router = Router();

router.get("/", getUsers);

router.get("/me", getCurrentUser);
router.patch("/me", validateUserData, updateProfile);
router.patch("/me/avatar", validateAvatar, updateAvatar);

router.get("/:id", validateObjectId, getUser);

export default router;
