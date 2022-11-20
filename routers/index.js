const express = require("express");
const router = express.Router();
const userRout = require("./user.rout");
const fileRout = require("../routers/file.rout");

router.use("/", userRout);
router.use("/file", fileRout);

module.exports = router;