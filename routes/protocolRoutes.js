import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addSample,
  getAllSamples,
  getMySamples,
  updateSampleProfile,
} from "../controllers/sampleController.js";
import {
  addProtocol,
  getAllProtocols,
  getMyProtocols,
} from "../controllers/protocolController.js";
const router = express.Router();
router.route("/").post(protect, addProtocol).get(protect, getAllProtocols);
router
  .route("/:id")
  .get(protect, getMyProtocols)
  .put(protect, updateSampleProfile);
export default router;
