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
const router = express.Router();
router
  .route("/:id")
  .get(getMyEntries)
  .put(protect, updateEntryProfile)
  .delete(protect, deleteEntry);

router.route("/convert/:id").put(protect, converUpdateEntry);
router.route("/").post(protect, addNewEntry);
router.route("/vc").post(addVersionControl);
router.route("/logs").post(addEntryLogs);

export default router;
