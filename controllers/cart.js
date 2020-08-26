const mongoose = require("mongoose");

const Cart = require("../models/cart");
const Medicine = require("../models/medicine");
const Diagnolotic = require("../models/diagnolotic");
const Order = require("../models/order");

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

exports.clearCart = (req, res, next) => {
  const userId = req.query.userId;
  Cart.findOneAndDelete({
    userId: userId,
  })
    .then((_) => res.status(200).json({ message: "Cart has been cleared." }))
    .catch((err) => console.log(err));
};

exports.checkout = (req, res, next) => {
  const userId = req.query.userId;
  const currDate = "orders." + Date.now();
  Cart.findOne()
    .where("userId")
    .equals(userId)
    .then((items) => {
      if (items) {
        console.log(items.cart);
        Order.findOneAndUpdate(
          {
            userId: userId,
          },
          { $push: { [currDate]: items.cart } },
          { upsert: true }
        )
          .then(async (_) => {
            await this.clearCart(req, res, next);
            res
              .status(200)
              .json({ message: "Order has been placed, Thank-You." });
          })
          .catch((err) => console.log(err));
      } else {
        res.status(200).json({ message: "No items in cart to checkout." });
      }
    })
    .catch((err) => console.log(err));
};
