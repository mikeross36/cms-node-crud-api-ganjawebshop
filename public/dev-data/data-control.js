"use strict"
const fs = require("fs")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const Ganja = require("./../../models/ganjaModel")
const Category = require("./../../models/categoryModel")
const User = require("./../../models/userModel")
const Member = require("./../../models/teamMemberModel")
const Podcast = require("./../../models/podcastModel")

dotenv.config({ path: "./config.env" })

mongoose.set("strictQuery", false)

const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log("DB connected from data-control.js"))
const data = JSON.parse(fs.readFileSync(`${__dirname}/podcast.json`, "utf-8"))

const loadData = async function () {
    try {
        await Podcast.create(data)
        console.log("Data loaded...")
    }
    catch (error) {
        console.log(error)
    }
};

const deleteData = async function () {
    try {
        await Podcast.deleteMany()
        console.log("Data deleted...")
    }
    catch (error) {
        console.log(error)
    }
};

if (process.argv[2] === "--import") {
    loadData()
}
else if (process.argv[2] === "--delete") {
    deleteData()
}

console.log(process.argv)