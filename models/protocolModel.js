import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const protocolSchema = mongoose.Schema(
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
    protocolId: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Protocol = mongoose.model("Protocol", protocolSchema);

export default Protocol;
