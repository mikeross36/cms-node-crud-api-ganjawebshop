"use strict"
const mongoose = require("mongoose")

const podcastSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is mandatory"],
            max: [20, "Max 20 chars allowed"],
            trim: true
        },
        coverImage: {
            type: String,
            required: [true, "Cover image is mandatory"]
        },
        content: {
            type: String,
            required: [true, "Content is mandatory"],
            max: [60, "Max 60 chars allowed"],
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
)

const Podcast = mongoose.model("Podcast", podcastSchema)

module.exports = Podcast;