import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addNewEntry,
  getEntriesById,
  getMyEntries,
} from "../controllers/entryController.js";
const router = express.Router();
router.route("/:id").get(getMyEntries);
router.route("/").post(protect, addNewEntry);

export default router;
