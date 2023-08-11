import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addSample,
  getAllSamples,
  getMySamples,
  updateSampleProfile,
} from "../controllers/sampleController.js";
import { addSop, getAllSops, getMySops } from "../controllers/sopController.js";
const router = express.Router();
router.route("/").post(protect, addSop).get(protect, getAllSops);
router.route("/:id").get(protect, getMySops).put(protect, updateSampleProfile);
export default router;
