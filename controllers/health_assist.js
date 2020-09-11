const PhysiotherapySpeciality = require("../models/physiotherapy_speciality");
const Order = require("../models/order");

exports.bookHealthAssist = (req, res, next) => {
  let id;
  const type = req.query.type.toString();
  if (type.toLowerCase() === "Physiotherapy".toLowerCase()) {
    id = 0;
  } else if (type.toLowerCase() === "Nurse".toLowerCase()) {
    id = 1;
  } else if (type.toLowerCase() === "Paramedic".toLowerCase()) {
    id = 2;
  } else if (type.toLowerCase() === "Aaya".toLowerCase()) {
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
