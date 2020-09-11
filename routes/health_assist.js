const express = require("express");
const router = express.Router();

const healthAssistController = require("../controllers/health_assist");

router.post(
  "/healthassist/bookhomehealthcare",
  healthAssistController.bookHomeHealthCare
);
router.get(
  "/healthassist/physiotherapyspecialities",
  healthAssistController.getPhysiotherapySpecialities
);
router.post(
  "/healthassist/bookphysiotherapyspeciality",
  healthAssistController.bookPhysiotherapy
);

module.exports = router;
