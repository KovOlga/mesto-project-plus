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

const handleAuthError = () => {
  throw new AuthenticationError("Необходима авторизация");
};

const extractBearerToken = (header: string | undefined) => {
  return header ? header.replace("Bearer ", "") : null;
};

// eslint-disable-next-line consistent-return
export default (req: SessionRequest, res: Response, next: NextFunction) => {
  // eslint-disable-next-line operator-linebreak
  const token =
    req.cookies.token || extractBearerToken(req.headers.authorization);
  let payload: Jwt | null = null;

  try {
    payload = jwt.verify(token, JWT_SECRET) as Jwt;
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  next();
};
