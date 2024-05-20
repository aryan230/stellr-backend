import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addEntryLogs,
  addNewEntry,
  addVersionControl,
  converUpdateEntry,
  deleteEntry,
  getEntriesById,
  getMyEntries,
  updateEntryProfile,
} from "../controllers/entryController.js";
import {
  addNewCD,
  getCDById,
  getMyCDs,
  updateCDData,
  updateCDShare,
} from "../controllers/chemicalDrawingController.js";
const router = express.Router();
router.route("/:id").put(protect, updateCDData).delete(protect, deleteEntry);

router.route("/convert/:id").put(protect, converUpdateEntry);
router.route("/").post(protect, addNewCD).get(protect, getMyCDs);
router.route("/vc").post(addVersionControl);
router.route("/logs").post(addEntryLogs);

router.route("/share/:id").get(protect, getCDById).put(protect, updateCDShare);
export default router;
