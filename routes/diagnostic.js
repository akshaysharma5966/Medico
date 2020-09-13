const express = require("express");
const router = express.Router();
const diagnosticController = require("../controllers/diagnostic");

router.get("/diagnostics", diagnosticController.getDiagnostic);

module.exports = router;
