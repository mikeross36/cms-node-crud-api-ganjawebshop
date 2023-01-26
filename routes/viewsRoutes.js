"use strict"
const express = require("express")
const router = express.Router()
const viewsController = require("./../controllers/viewsController")
const authController = require("./../controllers/authController")

router.get("*", viewsController.getUser)
router.get("/register", viewsController.getRegisterForm)
router.get("/forgot-password", viewsController.getForgotForm)
router.get("/reset-password/:token", viewsController.getResetPassForm)

router.get("/checkout",authController.isUserLoggedIn, viewsController.getCart)

router.get("/login", authController.isUserLoggedIn, viewsController.getLoginForm)
router.get("/my-account", authController.tokenProtect, viewsController.getAccount)
router.get("/", authController.isUserLoggedIn, viewsController.getIndexPage)
router.get("/podcast", authController.isUserLoggedIn, viewsController.getPodcast)
router.get("/our-team", authController.isUserLoggedIn, viewsController.getTeam)
router.get("/categories", authController.isUserLoggedIn, viewsController.getCategories)
router.get("/our-products", authController.isUserLoggedIn, viewsController.getOurProducts)
router.get("/:slug", authController.isUserLoggedIn, viewsController.getEachPage)

router.get("/product/:slug", authController.isUserLoggedIn, viewsController.getProduct)
router.get("/products-by-categories/:slug", authController.isUserLoggedIn, viewsController.getProductsByCategories)
router.get("/reviews-by-product/:slug", authController.isUserLoggedIn, viewsController.getProductsReviews)

module.exports = router;