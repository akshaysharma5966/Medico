const mongoose = require("mongoose");

const Cart = require("../models/cart");
const Medicine = require("../models/medicine");
const Diagnolotic = require("../models/diagnolotic");

exports.getCartItems = (req, res, next) => {
  Cart.findOne()
    .where("userId")
    .equals(req.query.userId)
    .then(async (items) => {
      if (items) {
        const temp = items.cart.map((item) => {
          return { itemId: item.itemId, itemType: item.itemType };
        });
        const cartItems = {};
        const medicines = [];
        const diagnolotics = [];
        await Promise.all(
          temp.map(async (element) => {
            if (element.itemType.toUpperCase() == "Medicine".toUpperCase()) {
              const medicine = await Medicine.findOne()
                .where("_id")
                .equals(element.itemId);
              if (medicine) {
                medicines.push(medicine);
              }
            } else if (
              element.itemType.toUpperCase() == "Diagnolotic".toUpperCase()
            ) {
              const diagnolotic = await Diagnolotic.findOne()
                .where("_id")
                .equals(element.itemId);
              if (diagnolotic) {
                diagnolotics.push(diagnolotic);
              }
            }
          })
        );
        cartItems.medicines = medicines;
        cartItems.diagnolotics = diagnolotics;
        res.status(200).json(cartItems);
      } else {
        res.status(200).json({});
      }
    })
    .catch((err) => console.log(err));
};

exports.addItemToCart = (req, res, next) => {
  const userId = req.body.userId;
  const itemToAdd = {
    itemId: req.body.itemId,
    itemType: req.body.itemType,
  };
  Cart.findOneAndUpdate(
    {
      userId: userId,
    },
    { $push: { cart: itemToAdd } },
    { upsert: true }
  )
    .then((_) => res.status(201).json({ message: "Item has been to cart." }))
    .catch((err) => console.log(err));
};

exports.removeItemFromCart = (req, res, next) => {
  const userId = req.query.userId;
  const itemId = req.query.itemId;
  Cart.findOneAndUpdate(
    { userId: userId },
    { $pull: { cart: { itemId: mongoose.Types.ObjectId(itemId) } } }
  )
    .then((_) =>
      res.status(201).json({ message: "Item has been removed from cart." })
    )
    .catch((err) => console.log(err));
};
