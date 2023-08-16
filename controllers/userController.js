import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Task from "../models/taskModel.js";
import Protocol from "../models/protocolModel.js";
import Project from "../models/projectModel.js";
import Organization from "../models/organizationModel.js";
import Entry from "../models/EntryModel.js";
import Sample from "../models/sampleModel.js";

const googleAuth = asyncHandler(async (req, res) => {
  const { email, name, type } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    const user = await User.create({
      name,
      email,
      type,
    });
    if (user) {
      res.status(201);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User data");
    }
  }
});

const microsoftAuth = asyncHandler(async (req, res) => {
  const { email, name, type } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    const user = await User.create({
      name,
      email,
      type,
    });
    if (user) {
      res.status(201);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User data");
    }
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password, type } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    if (await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or password");
    }
  } else {
    const userCreated = await User.create({
      email,
      password,
      type,
    });

    if (userCreated) {
      res.status(201);
      res.json({
        _id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        isAdmin: userCreated.isAdmin,
        token: generateToken(userCreated._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User data");
    }
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isGuest, isAdmin } = req.body;
  if (isGuest) {
    const user = await User.create({
      name,
      email,
    });
    if (user) {
      res.status(201);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User data");
    }
  } else {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User Already Exixts");
    }
    const user = await User.create({
      name,
      email,
      password,
      isAdmin,
    });

    if (user) {
      res.status(201);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User data");
    }
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  const user = await User.findById(req.user._id);
  if (user) {
    if (user.name) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.json({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  } else {
    res.status(404);
    throw new Error("No User Found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("No User Found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const getUsersByEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.find({ email });
  res.json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User deleted sucessfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("No User Found");
  }
});

const getUserMetrics = asyncHandler(async (req, res) => {
  const users = await User.find({});
  const samples = await Sample.find({});
  const projects = await Project.find({});
  const organizations = await Organization.find({});
  const entries = await Entry.find({});
  const tasks = await Task.find({});
  const protocols = await Protocol.find({});

  res.json({
    users,
    samples,
    projects,
    organizations,
    entries,
    tasks,
    protocols,
  });
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
  googleAuth,
  microsoftAuth,
  getUsersByEmail,
  getUserMetrics,
};
