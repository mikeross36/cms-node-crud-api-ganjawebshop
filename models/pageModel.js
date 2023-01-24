"use strict"
const mongoose = require("mongoose")

const pageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is mandatory!"],
        },
        slug: String,
        content: {
            type: String,
            required: [true, "Content is mandatory!"],
        },
        imageCover: {
            type: String,
        },
        sorting: Number
    }
);

const Page = mongoose.model("Page", pageSchema)

module.exports = Page;