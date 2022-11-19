const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const auth = require("../auth/auth");

router.post("/signup", UserController.register);
router.post("/signin", UserController.login);
router.get("/info", auth.authenticateToken, UserController.info);
router.get("/logout", auth.authenticateToken, UserController.logout);

module.exports = router;