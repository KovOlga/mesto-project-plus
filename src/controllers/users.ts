/* eslint-disable object-curly-newline */
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import NotFoundError from "../errors/not-found-err";
import BadRequestError from "../errors/bad-request-err";
import { SessionRequest } from "../middlewares/auth";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

export const getUserInfoById = (
  id: string,
  res: Response,
  next: NextFunction
) => {
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError("Пользователь по указанному _id не найден");
    })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  getUserInfoById(req.params.id, res, next);
};

export const getCurrentUser = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  getUserInfoById(req.user!._id, res, next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "validationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "super-strong-secret", {
        expiresIn: "7d",
      });
      res.cookie("token", token, { httpOnly: true }).send({ token, user });
    })
    .catch(next);
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
