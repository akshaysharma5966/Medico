const express = require("express");
const router = express.Router();

const memberController = require("../controllers/member");

router.get("/checkmember", memberController.checkMember);
router.get("/getmember", memberController.getMember);

module.exports = router;
