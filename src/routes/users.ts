import { Router } from "express";
import {
  validateAvatar,
  validateObjectId,
  validateUserData,
  validateUserProfile,
} from "../middlewares/validations";
import {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
} from "../controllers/users";

const router = Router();

router.get("/", getUsers);
router.get("/:id", validateObjectId, getUserById);
router.post("/", validateUserProfile, createUser);

router.patch("/me", validateUserData, updateProfile);

router.patch("/me/avatar", validateAvatar, updateAvatar);

export default router;
