import express from "express";
import { uesrController } from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(uesrController)

export default router;
