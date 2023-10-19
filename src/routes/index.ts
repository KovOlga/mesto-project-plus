import { Router } from "express";
import UsersRouter from "./users";
import CardsRouter from "./cards";
import AuthenticationRouter from "./authentication";
import auth from "../middlewares/auth";

const router = Router();

router.use("/", AuthenticationRouter);
router.use(auth);
router.use("/users", UsersRouter);
router.use("/cards", CardsRouter);

export default router;
