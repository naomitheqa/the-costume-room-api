import express from "express";
import { addItem } from "../app/item_app.js";
const router = express.Router();

router.route("/add-item").post(addItem);
export default router;
