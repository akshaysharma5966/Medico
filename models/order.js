const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subOrder = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
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

const order = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    doctors: [subOrder],
    healthAssists: [subOrder],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", order);
