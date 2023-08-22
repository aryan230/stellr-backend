import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const entryTemplateSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    blocks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const EntryTemplate = mongoose.model("EntryTemplate", entryTemplateSchema);

export default EntryTemplate;
