"use strict"
const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: "Ganja",
            required: true
        },
        quantity: {
            type: Number,
            min: [1, "Quantity cannot be less then 1"]
        },
        price: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        coverImage: {
            type: String,
            required: true
        },
        ceatedAt: {
            type: Date,
            default: Date.now()
        }
    }
);

const cartSchema = new mongoose.Schema(
    {
        items: [itemSchema],
        subTotal: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
);

cartSchema.pre(/^find/, function (next) {
    this.populate({
        path: "items.productId",
        select: "name price totak"
    })
    next()
});

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart;