import express from "express";
import { errors } from "celebrate";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/error-handler";
import { PORT, DB_ADDRESS } from "./config";
import { requestLogger, errorLogger } from "./middlewares/logger";
import routes from "./routes";

const app = express();
app.use(
  cors({
    origin: "http://mesto.project.nomoredomainsmonster.ru",
    credentials: true,
  })
);
mongoose.connect(DB_ADDRESS);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port: ${PORT}`);
});
