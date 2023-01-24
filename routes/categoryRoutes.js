"use strict"
const express = require("express")
const router = express.Router();
const categoryController = require("./../controllers/categoryController")
const authController = require("./../controllers/authController")
const ganjaRouter = require("./ganjaRoutes")

router.use("/:categoryId/ganjas", ganjaRouter)

router.use(authController.tokenProtect)

router.route("/")
    .get(categoryController.getAllCategories)
    .post(authController.restrictTo("admin"), categoryController.createCategory)

router.route("/:id")
    .get(categoryController.getCategory)
    .patch(authController.restrictTo("admin"), categoryController.updateCategory)
    .delete(authController.restrictTo("admin"), categoryController.deleteCategory)

module.exports = router;