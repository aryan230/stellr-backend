import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addSample,
  getAllSamples,
  getMySamples,
  updateSampleProfile,
} from "../controllers/sampleController.js";
import {
  addSOPLogs,
  addSop,
  deleteSOP,
  getAllSops,
  getMySops,
  getSopById,
  restoreSOP,
  updateSopProfile,
  updateSopStatus,
} from "../controllers/sopController.js";
const router = express.Router();
router.route("/").post(protect, addSop).get(protect, getAllSops);
router.route("/logs").post(addSOPLogs);
router
  .route("/share/:id")
  .get(protect, getSopById)
  .put(protect, updateSopProfile);

router.route("/:id").get(protect, getMySops).put(protect, updateSopProfile);
router.route("/p/:id").get(protect, getSopById).delete(protect, deleteSOP);
router.route("/r/:id").delete(protect, restoreSOP);
router.route("/status/:id").put(updateSopStatus);

export default router;
