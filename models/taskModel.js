import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const taskSchema = mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    subject: {
      type: String,
      required: true,
    },
    due_date: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
    },
    status: {
      type: String,
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

const Task = mongoose.model("Task", taskSchema);

export default Task;
