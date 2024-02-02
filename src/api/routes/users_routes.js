import express from "express";
import { login, updatePassword } from "../app/user_app.js";
const router = express.Router();

router.route("/login").post(login);
router.route("/password-update").post(updatePassword);

export default router;
