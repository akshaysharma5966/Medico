const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicine");

router.get("/medicines", medicineController.getMedicines);

module.exports = router;
