"use strict"
const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Review content is mandatory"],
            max: [60, "Max 60 chars allowed"],
            trim: true
        },
        rating: {
            type: Number,
            required: [true, "Rating from 1 to 5 is mandatory"],
            min: 1,
            max: 5
        },
        ganja: {
            type: mongoose.Schema.ObjectId,
            ref: "Ganja",
            required: [true, "A review must be ganja related"]
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "A review must be a user realted"]
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
    }
);

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name photo"
    })
    next()
});

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "ganja",
        select: "name coverImage"
    })
    next()
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review;
