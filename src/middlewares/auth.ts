import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import AuthenticationError from "../errors/authentication-err";

interface Jwt extends JwtPayload {
  _id: string;
}

export interface SessionRequest extends Request {
  user?: Jwt;
}

const extractBearerToken = (header: string | undefined) => {
  return header ? header.replace("Bearer ", "") : null;
};

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const token =
    req.cookies.token || extractBearerToken(req.headers.authorization);
  let payload: Jwt | null = null;

  try {
    payload = jwt.verify(token, JWT_SECRET) as Jwt;
    req.user = payload;

    next();
  } catch (err) {
    next(new AuthenticationError("Необходима авторизация"));
  }
};
