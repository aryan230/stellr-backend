import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const sampleSchema = mongoose.Schema(
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
    type: {
      type: String,
      required: true,
    },
    data: {
      type: String,
    },
    sampleId: {
      type: Number,
    },
    assigned: [
      {
        user: {
          type: String,
        },
        userName: {
          type: String,
        },
        userType: {
          type: String,
          default: "user",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Sample = mongoose.model("Sample", sampleSchema);

export default Sample;
