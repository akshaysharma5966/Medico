const Cart = require("../models/cart");
const Medicine = require("../models/medicine");
const Diagnolotic = require("../models/diagnolotic");

exports.getCartItems = (req, res, next) => {
  Cart.findOne()
    .where("userId")
    .equals(req.query.userId)
    .then(async (items) => {
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
      cartItems.medicines = medicines.length == 0 ? null : medicines;
      cartItems.diagnolotics = diagnolotics.length == 0 ? null : diagnolotics;
      res.status(200).json(cartItems);
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
