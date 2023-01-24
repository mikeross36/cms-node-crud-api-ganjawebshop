"use strict"
const express = require("express")
const cartController = require("./../controllers/cartController")
const authController = require("./../controllers/authController")

const router = express.Router()
router.post("/add-to-cart/:producId", authController.isUserLoggedIn, cartController.addItemToCart)
router.get("/", cartController.getCart)
router.post("/empty-cart", cartController.emptyCart)
router.patch("/remove-item", cartController.removeItemFromCart)
router.patch("/decrease", cartController.decreaseQuantity)
router.patch("/increase", cartController.increaseQuantity)


module.exports = router;