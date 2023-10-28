const express = require("express");
const UsersApplication = require("../app/user_app");
const router = express.Router();

router.route("/login").post(UsersApplication.login);

module.exports = router;