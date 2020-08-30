const Member = require("../models/member");

exports.checkMember = (req, res, next) => {
  const mobileNumber = req.query.mobileNumber;
  Member.findOne()
    .where("mobile")
    .equals()
    .then((member) => {
      if (member) {
        res.status(200).json({ [mobileNumber]: "1" });
      } else {
        res.status(404).json({ [mobileNumber]: "0" });
      }
    })
    .catch((err) => console.log(err));
};
