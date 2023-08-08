import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addEntryLogs,
  addNewEntry,
  getEntriesById,
  getMyEntries,
  updateEntryProfile,
} from "../controllers/entryController.js";
const router = express.Router();
router.route("/:id").get(getMyEntries).put(protect, updateEntryProfile);
router.route("/").post(protect, addNewEntry);
router.route("/logs").post(protect, addEntryLogs);
export default router;
