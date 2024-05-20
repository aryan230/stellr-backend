import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Task from "../models/taskModel.js";
import Protocol from "../models/protocolModel.js";
import Project from "../models/projectModel.js";
import Organization from "../models/organizationModel.js";
import Entry from "../models/EntryModel.js";
import Sample from "../models/sampleModel.js";
import SOP from "../models/sopModel.js";
import { client } from "../server.js";
import TemplateOne from "../templates/one.js";
import TemplateTwo from "../templates/two.js";

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
      deactivated: user.deactivated,
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
        deactivated: user.deactivated,
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
      deactivated: user.deactivated,
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
        deactivated: user.deactivated,
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
        deactivated: user.deactivated,
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
        deactivated: user.deactivated,
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
      if (user.password) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          company: user.company,
          title: user.title,
          isAdmin: user.isAdmin,
          password: true,
          home: user.home,
          deactivated: user.deactivated,
        });
      } else {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          company: user.company,
          title: user.title,
          isAdmin: user.isAdmin,
          home: user.home,
          deactivated: user.deactivated,
          password: false,
        });
      }
    } else {
      if (user.password) {
        res.json({
          _id: user._id,
          email: user.email,
          createdAt: user.createdAt,
          isAdmin: user.isAdmin,
          company: user.company,
          title: user.title,
          home: user.home,
          password: true,
          deactivated: user.deactivated,
        });
      } else {
        res.json({
          _id: user._id,
          email: user.email,
          createdAt: user.createdAt,
          isAdmin: user.isAdmin,
          company: user.company,
          title: user.title,
          home: user.home,
          password: false,
          deactivated: user.deactivated,
        });
      }
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
      (user.email = req.body.email || user.email),
      (user.title = req.body.title || user.title),
      (user.company = req.body.company || user.company),
      (user.home = req.body.home || user.home);
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      home: updatedUser.home,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("No User Found");
  }
});

const checkPasswordUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { password } = req.body;
  if (user) {
    if (await user.matchPassword(password)) {
      res.json({
        password: true,
      });
    } else {
      res.json({
        password: false,
      });
    }
  } else {
    res.status(404);
    throw new Error("No User Found");
  }
});

const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
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

const sendDeactivationOTP = asyncHandler(async (req, res) => {
  const { otp, email, id } = req.body;
  const user = await User.findById(id);
  if (user) {
    console.log(user.name);
    const messageData = {
      from: "no-reply <admin@getstellr.io>",
      to: email,
      subject: `One Time Password (OTP for account deactivation)`,
      html: `${TemplateTwo(
        `Your one time password for account deactivation`,
        user.name,
        `All of your data will be saved in our servers but you will not be able to login with the same account untill recovered. Please use the following code to deactivate your account.`,
        `${otp}`,
        `https://app.getstellr.io/`,
        `© Stellr Tech Solutions Private Limited`
      )}`,
    };

    client.messages
      .create("getstellr.io", messageData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        // throw new Error("There was an error");
      });

    res.json({ message: "Success" });
  }
});

const sendActivationOTP = asyncHandler(async (req, res) => {
  const { otp, email, id } = req.body;
  const user = await User.findById(id);
  if (user) {
    console.log(user.name);
    const messageData = {
      from: "no-reply <admin@getstellr.io>",
      to: email,
      subject: `Account Recovery: One Time Password (OTP for account activation)`,
      html: `${TemplateTwo(
        `Your one time password for account activation`,
        user.name,
        `All of your data will be retrieved and you will be able to login with the same account and password.`,
        `${otp}`,
        `https://app.getstellr.io/`,
        `© Stellr Tech Solutions Private Limited`
      )}`,
    };

    client.messages
      .create("getstellr.io", messageData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        // throw new Error("There was an error");
      });

    res.json({ message: "Success" });
  }
});

const userAccountDeactivation = asyncHandler(async (req, res) => {
  const { email, id } = req.body;
  const user = await User.findById(id);
  if (user) {
    user.deactivated = true;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    throw new Error("Invalid Auth");
  }
});

const userAccountActivation = asyncHandler(async (req, res) => {
  const { email, id } = req.body;
  const user = await User.findById(id);
  if (user) {
    user.deactivated = false;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    throw new Error("Invalid Auth");
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

const getUserMetricsIndividual = asyncHandler(async (req, res) => {
  const samples = await Sample.find({ user: req.user._id });
  const projects = await Project.find({ user: req.user._id });
  const sops = await SOP.find({ user: req.user._id });
  const protocols = await Protocol.find({ user: req.user._id });

  res.json({
    samples,
    projects,
    sops,
    protocols,
  });
});

const addUserActiveStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    let activeLogs = user.activeStatus;
    const todaysDate = new Date().toLocaleString();
    const findTodaysLog = await activeLogs.find(
      (e) => e.date.split(",")[0] == todaysDate.split(",")[0]
    );
    if (!findTodaysLog) {
      activeLogs.push({
        date: todaysDate,
      });
      user.activeStatus = activeLogs;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      throw new Error("Log already exists for today");
    }
    console.log(findTodaysLog);
  } else {
    throw new Error(" No entry with id");
  }
});

const getSharedData = asyncHandler(async (req, res) => {
  res.json(samples);
  // const sops = await SOP.find({ user: req.user._id });
  // const protocols = await Protocol.find({ user: req.user._id });

  // res.json({
  //   samples,
  //   projects,
  //   sops,
  //   protocols,
  // });
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
  addUserActiveStatus,
  checkPasswordUser,
  updateUserPassword,
  getUserMetricsIndividual,
  sendDeactivationOTP,
  userAccountDeactivation,
  sendActivationOTP,
  userAccountActivation,
  getSharedData,
};
