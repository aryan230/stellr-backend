import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addSample,
  addSampleLogs,
  getAllSamples,
  getMySamples,
  getSampleById,
  updateSampleProfile,
  updateSampleShare,
} from "../controllers/sampleController.js";
const router = express.Router();
router.route("/logs").post(addSampleLogs);
router.route("/").post(protect, addSample).get(protect, getAllSamples);

router
  .route("/share/:id")
  .get(protect, getSampleById)
  .put(protect, updateSampleShare);

router
  .route("/:id")
  .get(protect, getMySamples)
  .put(protect, updateSampleProfile);

export default router;
