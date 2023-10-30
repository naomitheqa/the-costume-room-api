const express = require("express");
const AdminApplication = require("../app/admin_app");
const router = express.Router();

router.route("/add-admin").post(AdminApplication.addAdmin);
router.route("/add-user").post(AdminApplication.addUser);
router.route("/admins").get(AdminApplication.getAllAdmins);
router.route("/users").get(AdminApplication.getAllUsers);

module.exports = router;