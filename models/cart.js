const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const items = new Schema({
  id: {
    type: Schema.ObjectId,
    required: true,
  },
  type: {
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
