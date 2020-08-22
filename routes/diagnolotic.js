const express = require("express");
const router = express.Router();
const diagnoloticController = require("../controllers/diagnolotic");

router.get("/diagnolotics", diagnoloticController.getDiagnolotic);

module.exports = router;
