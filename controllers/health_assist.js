const PhysiotherapySpeciality = require("../models/physiotherapy_speciality");
const Order = require("../models/order");

exports.bookHomeHealthCare = (req, res, next) => {
  let id;
  const type = req.query.type.toString().toLowerCase();
  if (type === "Physiotherapy".toLowerCase()) {
    id = 0;
  } else if (type === "Nurse".toLowerCase()) {
    id = 1;
  } else if (type === "Paramedic".toLowerCase()) {
    id = 2;
  } else if (type === "Aaya".toLowerCase()) {
    id = 3;
  } else {
    id = req.query.id;
  }
  Order.findOneAndUpdate(
    {
      userId: req.query.userId,
    },
    {
      $push: {
        healthAssists: {
          id: id,
          type: type,
        },
      },
    },
    { upsert: true, new: true }
  )
    .then((order) => {
      res.status(200).json({
        message:
          "Health Assist has been booked with id:\n" +
          order.healthAssists[order.healthAssists.length - 1]._id,
      });
    })
    .catch((err) => console.log(err));
};

exports.getPhysiotherapySpecialities = (req, res, next) => {
  PhysiotherapySpeciality.find()
    .then((specialities) => res.status(200).json(specialities))
    .catch((err) => console.log(err));
};

exports.bookPhysiotherapy = (req, res, next) => {
  Order.findOneAndUpdate(
    {
      userId: req.query.userId,
    },
    {
      $push: {
        healthAssists: {
          id: req.query.id,
          type: req.query.type,
        },
      },
    },
    { upsert: true, new: true }
  )
    .then((order) => {
      res.status(200).json({
        message:
          "Physiotherapy has been booked with id:\n" +
          order.healthAssists[order.healthAssists.length - 1]._id,
      });
    })
    .catch((err) => console.log(err));
};
