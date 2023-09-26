import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const dashboardSchema = mongoose.Schema(
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
    active: {
      type: String,
      default: "false",
    },
    dataSet: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

export default Dashboard;
