const express = require("express");
const router = express.Router();

const cartCotroller = require("../controllers/cart");

router.get("/cart", cartCotroller.getCartItems);
router.post("/cart", cartCotroller.addItemToCart);
router.post("/cart/checkout", cartCotroller.checkout);
router.delete("/cart", cartCotroller.removeItemFromCart);
router.delete("/cart/clear", cartCotroller.clearCart);
router.get("/cart/orders", cartCotroller.getOrders);
router.get("/cart/appointments", cartCotroller.getDoctorAppoinments);

module.exports = router;
