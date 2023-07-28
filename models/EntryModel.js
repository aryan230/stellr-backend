import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const entrySchema = mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    name: {
      type: String,
      required: true,
    },
    data: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        block: Object,
        date: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;
