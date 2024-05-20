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
    isEdit: {
      type: Boolean,
      default: true,
    },
    locked: {
      type: Boolean,
      default: false,
    },
    submittedForApproval: {
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
    eSign: {
      type: String,
    },
    statusMessage: {
      type: String,
    },
    authorSubmitted: {
      type: String,
    },
    share: {
      type: String,
      default: "",
    },
    deleted: {
      type: Boolean,
      default: false,
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
        anyData: {
          type: String
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;
