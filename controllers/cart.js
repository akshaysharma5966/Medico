const Cart = require("../models/cart");

exports.getCartItems = (req, res, next) => {
  Cart.findOne()
    .where("userId")
    .equals(req.query.userId)
    .then((items) => res.status(200).json(items))
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
