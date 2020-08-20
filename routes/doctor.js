const express = require("express");
const router = express.Router();
const doctorContoller = require("../controllers/doctor");

router.get("/doctors", doctorContoller.getDoctors);

module.exports = router;
