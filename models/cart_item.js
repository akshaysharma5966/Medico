const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema(
  {
    itemId: {
      type: Schema.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    itemType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
