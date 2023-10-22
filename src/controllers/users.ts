/* eslint-disable object-curly-newline */
import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import NotFoundError from "../errors/not-found-err";
import BadRequestError from "../errors/bad-request-err";
import AuthenticationError from "../errors/authentication-err";
import { SessionRequest } from "../middlewares/auth";
import { JWT_SECRET } from "../config";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else if (err.code === 11000) {
        next(
          new AuthenticationError("Пользователь с таким email уже существует")
        );
      } else {
        next(err);
      }
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, { httpOnly: true }).send({ token, user });
    })
    .catch(next);
};

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

const updateUserInfo = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  User.findByIdAndUpdate(req.user!._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new NotFoundError("Пользователь по указанному _id не найден");
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const updateProfile = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  updateUserInfo(req, res, next);
};

export const updateAvatar = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  updateUserInfo(req, res, next);
};
