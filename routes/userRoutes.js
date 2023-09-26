import express from "express";
import {
  addUserActiveStatus,
  authUser,
  checkPasswordUser,
  deleteUser,
  getUserByID,
  getUserMetrics,
  getUserMetricsIndividual,
  getUserProfile,
  getUsers,
  getUsersByEmail,
  googleAuth,
  microsoftAuth,
  registerUser,
  updateUser,
  updateUserPassword,
  updateUserProfile,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/email", getUsersByEmail);
router.post("/google", googleAuth);
router.post("/microsoft", microsoftAuth);
router.post("/login", authUser);

router.route("/userMetricsIndvidual").get(protect, getUserMetricsIndividual);

router.route("/").post(registerUser).get(protect, admin, getUsers);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/status").post(protect, addUserActiveStatus);
router
  .route("/password")
  .post(protect, checkPasswordUser)
  .put(protect, updateUserPassword);

router.route("/userMetrics").get(protect, admin, getUserMetrics);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, getUserByID)
  .put(protect, admin, updateUser);

export default router;
