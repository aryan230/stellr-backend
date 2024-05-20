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
  deleteProtocol,
  getAllProtocols,
  getMyProtocols,
  getProtocolById,
  restoreProtocol,
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

router
  .route("/share/:id")
  .get(protect, getProtocolById)
  .put(protect, updateProtocolProfile);

router
  .route("/p/:id")
  .get(protect, getProtocolById)
  .delete(protect, deleteProtocol);

router.route("/r/:id").delete(protect, restoreProtocol);
router.route("/status/:id").put(updateProtocolStatus);
export default router;
