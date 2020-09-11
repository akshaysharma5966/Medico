const express = require("express");
const router = express.Router();

const healthAssistController = require("../controllers/health_assist");

router.post("/bookHealthAssist", healthAssistController.bookHealthAssist);

module.exports = router;
