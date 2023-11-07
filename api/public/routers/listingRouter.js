import express from "express";
import { createListing } from "../controllers/listingController.js";
import { protect } from "../controllers/authController.js";
const router = express.Router();

router.route("/create").post(protect, createListing);

export default router;
