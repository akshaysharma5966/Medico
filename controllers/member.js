const Member = require("../models/member");

exports.checkMember = (req, res, next) => {
  Member.findOne()
    .where("mobile")
    .equals(req.query.mobileNumber)
    .then((member) => {
      if (member) {
        res.status(200).json({ ok: "1" });
      } else {
        res.status(404).json({ ok: "0" });
      }
    })
    .catch((err) => console.log(err));
};
