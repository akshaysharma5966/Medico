const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const items = new Schema({
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
});

const cart = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cart: [items],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cart);
