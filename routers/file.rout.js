const express = require("express");
const router = express.Router();
const FileController = require("../controllers/file.controller");
const auth = require("../auth/auth");
const Load = require("../db/load");

router.get("/list", auth.authenticateToken, FileController.findAll);
router.get("/:id", auth.authenticateToken, FileController.getOneFile);
router.get("/download/:id", auth.authenticateToken, FileController.download);
router.post("/upload", auth.authenticateToken, Load.upload.single("file"), FileController.upload);
router.put("/update/:id", auth.checkFile, auth.authenticateToken, Load.upload.single("file"), FileController.update);
router.delete("/delete/:id", auth.authenticateToken, FileController.delete);

module.exports = router;
