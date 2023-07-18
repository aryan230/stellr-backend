import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const entrySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    name: {
      type: String,
      required: true,
    },
    block: {
      time: {
        type: Number,
      },
      version: {
        type: Number,
      },
      blocks: [],
    },
  },
  {
    timestamps: true,
  }
);

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;
