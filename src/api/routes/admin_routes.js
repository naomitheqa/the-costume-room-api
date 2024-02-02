import express from "express";
import {
  addAdmin,
  addUser,
  getAllAdmins,
  getAllUsers,
  removeUser,
} from "../app/admin_app.js";
const router = express.Router();

router.route("/add-admin").post(addAdmin);
router.route("/add-user").post(addUser);
router.route("/admins").get(getAllAdmins);
router.route("/users").get(getAllUsers);
router.route("/delete-user").delete(removeUser);

export default router;
