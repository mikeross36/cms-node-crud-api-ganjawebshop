"use strict"
const mongoose = require("mongoose")
const slugify = require("slugify")

const ganjaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is mandatory!"],
            unique: true,
            trim: true
        },
        category: {
            type: String,
            enum: ["Sativa", "Indica", "Hybrid"],
            required: [true, "category of ganja is mandatory"]
        },
        dateTested: {
            type: Date,
            default: Date.now()
        },
        thca: {
            type: String,
            required: [true, "THCA prcentage must be defined!"]
        },
        thc: {
            type: String,
            required: [true, "THC percentage must be defined!"]
        },
        cbda: {
            type: String,
            required: [true, "CBDA percentage must be defined!"]
        },
        cbd: {
            type: String,
            requred: [true, "CBD percentage must be defined"]
        },
        summary: {
            type: String,
            required: [true, "Summary is mandatory"]
        },
        description: String,
        slug: String,
        price: {
            type: Number,
            required: [true, "Price must be defined!"]
        },
        coverImage: {
            type: String,
            required: [true, "Cover image is mandatory"]
        },
        rating: {
            type: Number,
            default: 4,
            min: 1,
            max: 5
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

ganjaSchema.virtual("reviews", {
    ref: "Review",
    foreignField: "ganja",
    localField: "_id"
});

ganjaSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
});

const Ganja = mongoose.model("Ganja", ganjaSchema)

module.exports = Ganja;