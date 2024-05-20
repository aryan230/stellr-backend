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
    status: {
      type: String,
      default: "Draft",
    },
    statusBy: {
      type: String,
    },
    share: {
      type: String,
      default: "",
    },
    statusMessage: {
      type: String,
    },
    data: {
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
    deleted: {
      type: Boolean,
      default: false,
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

const Protocol = mongoose.model("Protocol", protocolSchema);

export default Protocol;
