import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const sopSchema = mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Project",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    objective: {
      type: String,
    },
    scope: {
      type: String,
    },
    procedureFreq: {
      type: String,
    },
    procedure: {
      type: String,
    },
    materials: {
      type: String,
    },
    safety: {
      type: String,
    },
    results: {
      type: String,
    },
    sopId: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const SOP = mongoose.model("SOP", sopSchema);

export default SOP;
