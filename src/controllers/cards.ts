import { NextFunction, Request, Response } from "express";
import Card from "../models/card";
import { SessionRequest } from "../middlewares/auth";
import NotFoundError from "../errors/not-found-err";
import AuthenticationError from "../errors/authentication-err";

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .populate("owner")
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

export const createCard = async (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;

  return (await Card.create({ name, link, owner: req.user!._id }))
    .populate("owner")
    .then((card) => res.status(201).send(card))
    .catch(next);
};

export const deleteCardById = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  return Card.findById(id)
    .orFail(() => {
      throw new NotFoundError("Карточка с указанным _id не найдена");
    })
    .then((card) => {
      if (card.owner.toString() === req.user!._id) {
        return Card.deleteOne({ _id: id }).then(() =>
          res.status(200).send({ message: "Пост удалён" })
        );
      }
      throw new AuthenticationError("Нельзя удалить чужую карточку");
    })
    .catch(next);
};

export const putLike = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  return Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user!._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Передан несуществующий _id карточки");
    })
    .populate("likes")
    .populate("owner")
    .then((card) => res.status(200).send(card))
    .catch(next);
};

export const deleteLike = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  return Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user!._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Передан несуществующий _id карточки");
    })
    .populate("owner")
    .populate("likes")
    .then((card) => res.status(200).send(card))
    .catch(next);
};
