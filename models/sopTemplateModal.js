import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const sopTemplateSchema = mongoose.Schema(
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
    data: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SOPTemplate = mongoose.model("SOPTemplate", sopTemplateSchema);

export default SOPTemplate;
