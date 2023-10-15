import { NextFunction, Request, Response } from "express";
import Card from "../models/card";
import NotFoundError from "../errors/not-found-err";

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .populate("owner")
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;
  const owner = req.body._id;

  return (await Card.create({ name, link, owner }))
    .populate("owner")
    .then((card) => res.status(201).send(card))
    .catch(next);
};

export const deleteCardById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  return Card.findByIdAndRemove(id)
    .orFail(() => {
      throw new NotFoundError("Карточка с указанным _id не найдена");
    })
    .then(() => res.status(200).send({ message: "Пост удалён" }))
    .catch(next);
};

export const putLike = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.body._id;

  return Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: userId } },
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

export const deleteLike = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.body._id;

  return Card.findByIdAndUpdate(id, { $pull: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError("Передан несуществующий _id карточки");
    })
    .populate("owner")
    .populate("likes")
    .then((card) => res.status(200).send(card))
    .catch(next);
};
