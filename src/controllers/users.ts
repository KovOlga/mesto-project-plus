import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import NotFoundError from "../errors/not-found-err";
import BadRequestError from "../errors/bad-request-err";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(() => {
      throw new NotFoundError("Пользователь по указанному _id не найден");
    })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "validationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, about } = req.body;
  const id = req.body._id;

  return User.findByIdAndUpdate(id, { name, about }, { new: true })
    .orFail(() => {
      throw new NotFoundError("Пользователь по указанному _id не найден");
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "validationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const updateAvatar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { avatar } = req.body;
  const id = req.body._id;

  return User.findByIdAndUpdate(id, { avatar }, { new: true })
    .orFail(() => {
      throw new NotFoundError("Пользователь по указанному _id не найден");
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "validationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};
