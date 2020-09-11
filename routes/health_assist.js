const express = require("express");
const router = express.Router();

const healthAssistController = require("../controllers/health_assist");

router.post("/healthassist/book", healthAssistController.bookHealthAssist);
router.get(
  "/healthassist/physiotherapyspecialities",
  healthAssistController.getPhysiotherapySpecialities
);
router.get("/healthassist/insurances", healthAssistController.getInsurances);

module.exports = router;
