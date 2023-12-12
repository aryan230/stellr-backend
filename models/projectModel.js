import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const projectSchema = mongoose.Schema(
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
    deleted: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      required: true,
      default: "#4338ca",
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
    collaborators: [
      {
        user: {
          type: String,
        },
        userName: {
          type: String,
        },
        userType: {
          type: String,
          default: "Read",
        },
        permissions: {
          type: String,
          default: "",
        },
      },
    ],
    organizations: [
      {
        organization: {
          type: String,
        },
        organizationName: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
