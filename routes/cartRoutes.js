"use strict"
const express = require("express")
const cartController = require("./../controllers/cartController")
const authController = require("./../controllers/authController")

const router = express.Router()

router.use(authController.tokenProtect)

router.post("/add-to-cart", authController.isUserLoggedIn, cartController.addItemToCart)
// router.post("/update-cart", cartController.updateCart)
router.get("/", cartController.getCart)
router.patch("/remove-item", cartController.removeItemFromCart)
router.patch("/decrease", cartController.decreaseQuantity)
router.patch("/increase", cartController.increaseQuantity)
router.post("/clear-cart", cartController.clearCart)


module.exports = router;