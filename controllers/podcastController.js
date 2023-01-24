"use strict"
const Podcast = require("./../models/podcastModel")
const factory = require("./factoryController")

exports.getAllPodcasts = factory.getAll(Podcast)
exports.getPodcast = factory.getOne(Podcast)
exports.createPodcast = factory.createOne(Podcast)
exports.updatePodcast = factory.updateOne(Podcast)
exports.deletePodcast = factory.deleteOne(Podcast)
