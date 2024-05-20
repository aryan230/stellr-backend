import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const organizationSchema = mongoose.Schema(
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
    projects: [
      {
        project: {
          type: String,
        },
        projectName: {
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
    collaborators: [
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
        userStatus: {
          type: String,
          default: "Joined",
          required: true,
        },
        userType: {
          type: String,
          default: "Lab Member",
        },
        permissions: {
          type: String,
          default: "Read",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
