import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const customFeildSchema = mongoose.Schema(
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
    },
    data: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CustomField = mongoose.model("CustomField", customFeildSchema);

export default CustomField;
