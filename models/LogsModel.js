import mongoose from "mongoose";
import { boolean } from "webidl-conversions";


const logsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    logs: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Logs = mongoose.model("Logs", logsSchema);

export default Logs;
