"use strict"
const express = require("express")
const ganjaController = require("./../controllers/ganjaController")
const authController = require("./../controllers/authController")
const reviewRouter = require("./reviewRoutes")

const router = express.Router({mergeParams: true});

router.use("/:ganjaId/reviews", reviewRouter)

router.use(authController.tokenProtect)

router.route("/")
    .get(ganjaController.getAllGanjas)
    .post(authController.restrictTo("admin"), ganjaController.createGanja)

router.route("/:id")
    .get(ganjaController.getGanja)
    .patch(authController.restrictTo("admin"), ganjaController.updateGanja)
    .delete(authController.restrictTo("admin"), ganjaController.deletGanja)

module.exports = router;