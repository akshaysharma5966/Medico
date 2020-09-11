const mongoose = require("mongoose");

const Cart = require("../models/cart");
const Medicine = require("../models/medicine");
const Diagnolotic = require("../models/diagnolotic");
const Order = require("../models/order");
const { response } = require("express");

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
    .then((_) => {
      if (res) {
        res.status(200).json({ message: "Cart has been cleared." });
      }
    })
    .catch((err) => console.log(err));
};

exports.checkout = (req, res, next) => {
  const userId = req.query.userId;
  const temp = Date.now();
  const currDate = "items." + temp;
  Cart.findOne()
    .where("userId")
    .equals(userId)
    .then((items) => {
      if (items) {
        Order.findOneAndUpdate(
          {
            userId: userId,
          },
          {
            $set: {
              [currDate]: { ...items.cart, prescription: req.file.path },
            },
          },
          { upsert: true }
        )
          .then(async (_) => {
            await this.clearCart(req, null, next);
            res
              .status(200)
              .json({ message: "Order has been placed with id:\n" + temp });
          })
          .catch((err) => console.log(err));
      } else {
        res.status(200).json({ message: "No items in cart to checkout." });
      }
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.findOne({
    userId: req.query.userId,
  })
    .then((order) => {
      let response = [];
      if (order) {
        if (order.doctors && order.healthAssists)
          response = [...order.doctors, ...order.healthAssists].sort(function (
            a,
            b
          ) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        else if (order.doctors) response = [...order.doctors];
        else if (order.healthAssists) response = [...order.healthAssists];
      }
      res.status(200).json(response);
    })
    .catch((err) => console.log(err));
};
