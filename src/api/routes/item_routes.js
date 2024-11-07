import express from "express";
import { addItem, getAllItems } from "../app/item_app.js";
const router = express.Router();

router.route("/add-item").post(addItem);
router.route("/items").get(getAllItems);

export default router;
