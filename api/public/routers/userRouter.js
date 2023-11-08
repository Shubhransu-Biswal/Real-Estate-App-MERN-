import express from "express";
import { deleteUser, uesrController } from "../controllers/userController.js";
import { protect } from "../controllers/authController.js";
import { updateUser } from "../controllers/userController.js";
import { findListings } from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(uesrController);
router.route("/update/:id").post(protect, updateUser);
router.route("/delete/:id").delete(protect, deleteUser);
router.route("/listings/:id").get(protect, findListings);

export default router;
