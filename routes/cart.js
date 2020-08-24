const express = require("express");
const router = express.Router();

const cartCotroller = require("../controllers/cart");

router.get("/cart", cartCotroller.getCartItems);
router.post("/cart", cartCotroller.addItemToCart);

module.exports = router;
