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
              doctors: {
                id: doctor._id,
                name: doctor.name,
                price: doctor.price,
                type: "Doctor",
                bookedAt: new Date(parseInt(req.query.bookedAt)),
              },
            },
          },
          { upsert: true, new: true }
        )
          .then((order) => {
            res.status(200).json({
              message:
                "Doctor has been booked with id:\n" +
                order.doctors[order.doctors.length - 1]._id,
            });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};
