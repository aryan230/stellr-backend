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
  addProtocolLogs,
  getAllProtocols,
  getMyProtocols,
  updateProtocolProfile,
  updateProtocolStatus,
} from "../controllers/protocolController.js";
const router = express.Router();
router.route("/logs").post(addProtocolLogs);
router.route("/").post(protect, addProtocol).get(protect, getAllProtocols);
router
  .route("/:id")
  .get(protect, getMyProtocols)
  .put(protect, updateProtocolProfile);

router.route("/status/:id").put(updateProtocolStatus);
export default router;
