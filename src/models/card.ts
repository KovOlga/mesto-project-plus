import mongoose, { Schema } from "mongoose";

export interface ICard {
  name: string;
  link: string;
  owner: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  createdAt: Date | string;
}

const cardSchema = new mongoose.Schema<ICard>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export default mongoose.model<ICard>("Card", cardSchema);
