const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const auth = require("../auth/auth");

router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);
router.get("/signin/new_token", auth.authenticateToken, UserController.updateToken);
router.get("/info", auth.authenticateToken, UserController.info);
router.get("/logout", auth.authenticateToken, UserController.logout);

module.exports = router;