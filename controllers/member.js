const Member = require("../models/member");

exports.checkMember = (req, res, next) => {
  Member.findOne()
    .where("mobile")
    .equals(req.query.mobileNumber)
    .then((member) => {
      if (member) {
        res.status(200).json({ ok: "1" });
      } else {
        res.status(200).json({ ok: "0" });
      }
    })
    .catch((err) => console.log(err));
};

exports.getMember = (req, res, next) => {
  Member.findOne({
    $or: [{ mobile: req.query.mobileNumber }, { email: req.query.email }],
  })
    .then((member) => {
      res.status(200).json(member);
    })
    .catch((err) => console.log(err));
};
