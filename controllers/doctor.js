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
          {
            $push: {
              doctors: { doctorId: doctor._id, bookedAt: req.query.bookedAt },
            },
          },
          { upsert: true, new: true }
        )
          .then((order) => {
            res.status(200).json({
              message:
                "Order has been placed with id:\n" +
                order.doctors[order.doctors.length - 1]._id,
            });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};
