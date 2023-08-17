import express from "express";
import {
  authUser,
  deleteUser,
  getUserByID,
  getUserMetrics,
  getUserProfile,
  getUsers,
  getUsersByEmail,
  googleAuth,
  microsoftAuth,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/email", getUsersByEmail);
router.post("/google", googleAuth);
router.post("/microsoft", microsoftAuth);
router.post("/login", authUser);
router.route("/").post(registerUser).get(protect, admin, getUsers);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/userMetrics").get(protect, admin, getUserMetrics);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, getUserByID)
  .put(protect, admin, updateUser);

export default router;
