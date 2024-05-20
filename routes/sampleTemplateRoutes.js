import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addNewSampleTemplate,
  deleteSampleTemplate,
  getMySampleTemplate,
} from "../controllers/sampleTemplateController.js";

const router = express.Router();
router.route("/myfields").get(protect, getMySampleTemplate);
router.route("/").post(protect, addNewSampleTemplate);
router.route("/:id").delete(protect, deleteSampleTemplate);
export default router;
