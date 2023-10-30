const express = require("express");
const UsersApplication = require("../app/user_app");
const router = express.Router();

router.route("/login").post(UsersApplication.login);
router.route("/password-update").post(UsersApplication.updatePassword);

module.exports = router;
