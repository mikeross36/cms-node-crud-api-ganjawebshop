"use strict"
const mongoose = require("mongoose")
const validator = require("validator")

const teamMemberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Team member name is mandatory"]
        },
        position: {
            type: String,
            required: [true, "Team member position is mandatory"]
        },
        email: {
            type: String,
            required: [true, "Team member email is mandatory"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Email is not valid"]
        },
        photo: {
            type: String,
            default: "default.jpg"
        },
        createdAt: Date
    }
);

const TeamMember = mongoose.model("TeamMember", teamMemberSchema)

module.exports = TeamMember;