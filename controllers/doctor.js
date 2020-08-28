const Doctor = require("../models/doctor");
const Order = require("../models/order");

exports.getDoctors = (req, res, next) => {
  Doctor.find()
    .then((doctors) => {
      res.status(200).json(doctors);
    })
    .catch((err) => console.log(err));
};

exports.bookDoctor = (req, res, next) => {
  Doctor.findOne()
    .where("_id")
    .equals(req.query.doctorId)
    .then((doctor) => {
      if (doctor) {
        Order.findOneAndUpdate(
          {
            userId: req.query.userId,
          },
          { $push: { doctors: doctor._id } },
          { upsert: true }
        )
          .then((order) =>
            res
              .status(200)
              .json({ message: "Order has been placed with id: \n" + temp })
          )
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};
