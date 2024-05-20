import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addLink,
  getLinkById,
  removeLink,
} from "../controllers/linkController.js";
const router = express.Router();

router.route("/").post(protect, addLink);
// router
//   .route("/:id")
//   .get(protect, getMyProtocols)
//   .put(protect, updateProtocolProfile);

router
  .route("/share/:id")
  .get(protect, getLinkById)
  .delete(protect, removeLink);

export default router;
