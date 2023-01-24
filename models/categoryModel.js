"use strict"
const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is mandatory!"],
            unique: true,
            trim: true
        },
        slug: String,
        origin: {
            type: String,
            required: [true, "Origin is mandatory"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Description is mandatory"],
            max: [60, "Max 60 chars allowed"],
            trim: true
        },
        cbdToThcRatio: {
            type: String,
            required: [true, "Ratio of cbd to thc is required"],
            trim: true
        },
        effectsOfUse: {
            type: String,
            required: [true, "Effects of use are require"],
            trim: true
        },
        periodOfUse: {
            type: String,
            trim: true
        },
        coverImage: {
            type: String,
            required: [true, "Cover image is mandatory"]
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        ganjas: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Ganja"
            }
        ]
    }
);

categorySchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
});

categorySchema.pre(/^find/, function (next) {
    this.populate({
        path: "ganjas"
    })
    next()
});

const Category = mongoose.model("Category", categorySchema)

module.exports = Category;