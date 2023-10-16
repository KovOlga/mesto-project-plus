import path from "path";
import express from "express";
import { errors } from "celebrate";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error-handler";
import auth from "./middlewares/auth";
import UsersRouter from "./routes/users";
import CardsRouter from "./routes/cards";
import AuthenticationRouter from "./routes/authentication";
import { PORT, DB_ADDRESS } from "./config";
import { requestLogger, errorLogger } from "./middlewares/logger";

const app = express();

mongoose.connect(DB_ADDRESS);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use("/", AuthenticationRouter);

app.use(auth);
app.use("/users", UsersRouter);
app.use("/cards", CardsRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port: ${PORT}`);
});
