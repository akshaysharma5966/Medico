const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorOrder = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const healthAssistOrder = new Schema(
  {
    id: {
      type: String,
    },
    type: {
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
    items: {
      type: Map,
      required: true,
    },
    doctors: [doctorOrder],
    healthAssists: [healthAssistOrder],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", order);
