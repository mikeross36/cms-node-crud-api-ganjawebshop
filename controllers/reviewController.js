"use strict"
const factory = require("./factoryController")
const Review = require("./../models/reviewModel")

exports.setGanjaUserIds = (req, res, next) => {
    if (!req.body.ganja) req.body.ganja = req.params.ganjaId;
    if (!req.body.user) req.body.user = req.user.id;
    next()
};

exports.getAllReviews = factory.getAll(Review)
exports.getReview = factory.getOne(Review)
exports.createReview = factory.createOne(Review)
exports.updateReview = factory.updateOne(Review)
exports.deleteReview = factory.deleteOne(Review)