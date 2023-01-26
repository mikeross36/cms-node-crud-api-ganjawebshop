"use strict"
const Cart = require("./../models/cartModel")

exports.cart = async () => {
    const carts = await Cart.find().populate({
        path: "items.productId",
        select: "name price total"
    })
    return carts[0];
};