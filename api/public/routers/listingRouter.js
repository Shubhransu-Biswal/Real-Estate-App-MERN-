import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from "../controllers/listingController.js";
import { protect } from "../controllers/authController.js";
const router = express.Router();

router.route("/create").post(protect, createListing);
router.route("/delete/:id").delete(protect, deleteListing);
router.route("/update/:id").patch(protect, updateListing);
router.route("/read/:id").get(getListing);
router.route("/read").get(getListings);

export default router;
