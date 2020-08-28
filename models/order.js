const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorOrder = new Schema(
  {
    doctorId: {
      type: String,
      required: true,
    },
    bookedAt: {
      type: Date,
      set: (d) => new Date(d * 1000),
      required: true,
    },
  },
  { timestamps: true }
);

const order = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: {
      type: Map,
      required: true,
    },
    doctors: [doctorOrder],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", order);
