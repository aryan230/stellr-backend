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
    status: {
      type: String,
      default: "Draft",
    },
    statusBy: {
      type: String,
    },
    statusMessage: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    file: {
      type: String,
    },
    share: {
      type: String,
      default: "",
    },
    data: {
      type: String,
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
    deleted: {
      type: Boolean,
      default: false,
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
    logs: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        userName: {
          type: String,
        },
        userEmail: {
          type: String,
        },
        message: {
          type: String,
        },
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

const SOP = mongoose.model("SOP", sopSchema);

export default SOP;
