const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorOrder = new Schema(
  {
    doctorId: {
      type: String,
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
    orders: {
      type: Map,
      required: true,
    },
    doctors: [doctorOrder],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", order);
