import path from "path";
import express, { Request, Response } from "express";
import { errors } from "celebrate";
import mongoose from "mongoose";
import errorHandler from "./middlewares/error-handler";
import UsersRouter from "./routes/users";
import CardsRouter from "./routes/cards";

mongoose.connect("mongodb://localhost:27017/mestodb");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use((req: Request, _res: Response, next) => {
  req.body = {
    ...req.body,
    _id: "65280c7c479a7e253910ca9c",
  };

  next();
});
app.use("/users", UsersRouter);
app.use("/cards", CardsRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port: ${PORT}`);
});
