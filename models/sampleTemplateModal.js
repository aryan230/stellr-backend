import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const sampleTemplateSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
      default: "sample",
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

const SampleTemplate = mongoose.model("SampleTemplate", sampleTemplateSchema);

export default SampleTemplate;
