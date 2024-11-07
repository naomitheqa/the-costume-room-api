import express from "express";
import { getAllItems } from "../app/item_app.js";
const router = express.Router();

router.route("/items").get(getAllItems);

export default router;
