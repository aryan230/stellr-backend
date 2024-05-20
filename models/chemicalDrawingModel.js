import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const chemicalDrawingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    converted: {
      type: Boolean,
      default: false,
    },
    share: {
      type: String,
      default: "",
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
    data: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        block: Object,
        image: {
          type: String,
        },
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

const ChemicalDrawing = mongoose.model(
  "ChemicalDrawing",
  chemicalDrawingSchema
);

export default ChemicalDrawing;
