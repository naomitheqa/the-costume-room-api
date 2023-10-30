const express = require("express");
const AdminApplication = require("../app/admin_app");
const router = express.Router();

router.route("/add-admin").post(AdminApplication.addAdmin);

module.exports = router;