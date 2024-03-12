import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    deactivated: {
      type: Boolean,
      default: false,
      required: true,
    },
    accountConfig: {
      type: Boolean,
      default: false,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    type: {
      type: String,
      default: "local",
      required: true,
    },
    home: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    projectCollabs: [
      {
        project: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Project",
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
    activeStatus: [
      {
        date: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
