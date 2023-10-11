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
    converted: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "Lab Notebook",
    },
    locked: {
      type: Boolean,
      default: false,
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
    newData: [
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
    versionControl: [
      {
        user: {
          type: String,
        },
        userName: {
          type: String,
        },
        userEmail: {
          type: String,
        },
        date: {
          type: Number,
        },
        oldData: {
          type: String,
        },
      },
    ],
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

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;
