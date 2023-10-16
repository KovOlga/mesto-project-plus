import { Router } from "express";
import {
  validateAvatar,
  validateObjectId,
  validateUserData,
} from "../middlewares/validations";
import {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
} from "../controllers/users";

const router = Router();

router.get("/", getUsers);
router.get("/:id", validateObjectId, getUserById);

router.patch("/me", validateUserData, updateProfile);

router.patch("/me/avatar", validateAvatar, updateAvatar);

export default router;
