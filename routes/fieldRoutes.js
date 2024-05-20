import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addNewEntryTemplate,
  deleteTemplate,
  getMyTemplates,
} from "../controllers/entryTemplateController.js";
import {
  addNewFieldTemplate,
  deleteField,
  getMyFields,
} from "../controllers/fieldController.js";

const router = express.Router();
router.route("/myfields").get(protect, getMyFields);
router.route("/").post(protect, addNewFieldTemplate);
router.route("/:id").delete(protect, deleteField);
export default router;
