import express from "express";
import { signup } from "../controllers/authController.js";
import { signin } from "../controllers/authController.js";
import { google } from "../controllers/authController.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/google").post(google);

export default router;
