import express from "express";
import { uesrController } from "../controllers/userController.js";
import { protect } from "../controllers/authController.js";
import { updateUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(uesrController);
router.route("/update/:id").post(protect, updateUser);

export default router;
