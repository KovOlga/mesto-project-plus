import { Router } from "express";
import {
  getCards,
  createCard,
  deleteCardById,
  putLike,
  deleteLike,
} from "../controllers/cards";
import { validateNewCard, validateObjectId } from "../middlewares/validations";

const router = Router();

router.get("/", getCards);
router.post("/", validateNewCard, createCard);

router.delete("/:id", validateObjectId, deleteCardById);

router.put("/:id/likes", validateObjectId, putLike);
router.delete("/:id/likes", validateObjectId, deleteLike);

export default router;
