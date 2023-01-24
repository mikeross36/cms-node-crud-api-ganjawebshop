"use strict"
const express = require("express")
const router = express.Router()
const pageController = require("../controllers/pageController")
const authController = require("./../controllers/authController")

router.use(authController.tokenProtect)

router.post("/reorder-pages", authController.restrictTo("admin"), pageController.reorderPages)

router.route("/")
    .get(pageController.getAllPages)
    .post(authController.restrictTo("admin"), pageController.createPage)

router.route("/:id")
    .get(pageController.getPage)
    .patch(authController.restrictTo("admin"), pageController.updatePage)
    .delete(authController.restrictTo("admin"), pageController.deletePage)

module.exports = router;