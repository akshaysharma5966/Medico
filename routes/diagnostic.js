const express = require("express");
const router = express.Router();
const diagnosticController = require("../controllers/diagnostic");

router.get("/diagnolotics", diagnosticController.getDiagnostic);

module.exports = router;
