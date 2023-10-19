import { Router, Request, Response, NextFunction } from "express";
import UsersRouter from "./users";
import CardsRouter from "./cards";
import AuthenticationRouter from "./authentication";
import auth from "../middlewares/auth";
import NotFoundError from "../errors/not-found-err";

const router = Router();

router.use("/", AuthenticationRouter);
router.use(auth);
router.use("/users", UsersRouter);
router.use("/cards", CardsRouter);
router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Маршрут не существует"));
});

export default router;
