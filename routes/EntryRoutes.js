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
  updateEntryShare,
  updateEntryStatus,
} from "../controllers/entryController.js";
const router = express.Router();
router
  .route("/:id")
  .get(getMyEntries)
  .put(protect, updateEntryProfile)
  .delete(protect, deleteEntry);

router
  .route("/share/:id")
  .get(protect, getEntriesById)
  .put(protect, updateEntryShare);
router.route("/p/:id").delete(protect, deleteEntry);
router.route("/convert/:id").put(protect, converUpdateEntry);
router.route("/status/:id").put(updateEntryStatus);
router.route("/").post(protect, addNewEntry);
router.route("/vc").post(addVersionControl);
router.route("/logs").post(addEntryLogs);
export default router;
