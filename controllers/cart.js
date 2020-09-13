const mongoose = require("mongoose");

const Cart = require("../models/cart");
const Medicine = require("../models/medicine");
const Diagnostic = require("../models/diagnostic");
const Order = require("../models/order");

exports.getCartItems = (req, res, next) => {
  Cart.findOne()
    .where("userId")
    .equals(req.query.userId)
    .then(async (items) => {
      if (items) {
        const temp = items.cart.map((item) => {
          return {
            id: item.id,
            type: item.type,
          };
        });
        const cartItems = {};
        const medicines = [];
        const diagnostics = [];
        await Promise.all(
          temp.map(async (element) => {
            if (element.type.toUpperCase() == "Medicine".toUpperCase()) {
              const medicine = await Medicine.findOne()
                .where("_id")
                .equals(element.id);
              if (medicine) {
                medicines.push(medicine);
              }
            } else if (
              element.type.toUpperCase() == "Diagnostic".toUpperCase()
            ) {
              const diagnostic = await Diagnostic.findOne()
                .where("_id")
                .equals(element.id);
              if (diagnostic) {
                diagnostics.push(diagnostic);
              }
            }
          })
        );
        cartItems.medicines = medicines;
        cartItems.diagnostics = diagnostics;
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
    id: req.body.id,
    type: req.body.type,
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
  const currDate = new Date();
  Cart.findOne()
    .where("userId")
    .equals(userId)
    .then(async (items) => {
      const orderId = mongoose.Types.ObjectId(Math.floor(currDate / 1000));
      const temp = items.cart.map((item) => {
        return {
          id: item.id,
          type: item.type,
        };
      });

      const fullItems = [];
      await Promise.all(
        temp.map(async (element) => {
          if (element.type.toUpperCase() == "Medicine".toUpperCase()) {
            const medicine = await Medicine.findOne()
              .where("_id")
              .equals(element.id);
            if (medicine) {
              fullItems.push({
                _id: orderId,
                id: medicine._id,
                name: medicine.drugName,
                price: medicine.price,
                type: "Medicine",
                createdAt: currDate,
              });
            }
          } else if (element.type.toUpperCase() == "Diagnostic".toUpperCase()) {
            const diagnostic = await Diagnostic.findOne()
              .where("_id")
              .equals(element.id);
            if (diagnostic) {
              fullItems.push({
                _id: orderId,
                id: diagnostic._id,
                name: diagnostic.name,
                price: diagnostic.rate,
                type: "Diagnosic",
                createdAt: currDate,
              });
            }
          }
        })
      );

      if (fullItems.length > 0) {
        Order.findOneAndUpdate(
          {
            userId: userId,
          },
          {
            $push: {
              items: { ...fullItems, prescription: req.file.path },
            },
          },
          { upsert: true }
        )
          .then(async (_) => {
            await this.clearCart(req, null, next);
            res.status(200).json({
              message: "Order has been placed with id:\n" + orderId,
            });
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
      const items = [];
      if (order) {
        if (order.items && order.healthAssists) {
          order.items.forEach((item) => {
            for (let key in item) {
              if (key !== "prescription") {
                items.push(item[key]);
              }
            }
          });
          response = [...items, ...order.healthAssists].sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        } else if (order.healthAssists) response = [...order.healthAssists];
        else if (order.items) {
          order.items.forEach((item) => {
            for (let key in item) {
              if (key !== "prescription") {
                items.push(item[key]);
              }
            }
          });
          response = [...items];
        }
      }
      res.status(200).json(response);
    })
    .catch((err) => console.log(err));
};
