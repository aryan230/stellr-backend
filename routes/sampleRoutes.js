import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addSample,
  getAllSamples,
  getMySamples,
} from "../controllers/sampleController.js";
const router = express.Router();
router.route("/").post(protect, addSample).get(protect, getAllSamples);
router.route("/:id").get(protect, getMySamples);
export default router;
