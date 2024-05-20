import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const organizationRolesModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Organization",
    },
    name: {
      type: String,
      required: true,
    },
    permissions: {
      type: String,
      required: true,
      default: "Read",
    },
  },
  {
    timestamps: true,
  }
);

const OrganizationRoles = mongoose.model(
  "OrganizationRoles",
  organizationRolesModel
);

export default OrganizationRoles;
