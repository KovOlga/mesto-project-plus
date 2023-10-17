import { Router } from "express";
import { login, createUser } from "../controllers/users";
import { validateUserProfile } from "../middlewares/validations";

const router = Router();

router.post("/signin", validateUserProfile, login);
router.post("/signup", validateUserProfile, createUser);

export default router;
