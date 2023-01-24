"use strict"
const express = require("express")
const router = express.Router();
const authController = require("./../controllers/authController")
const userController = require("./../controllers/userController")

router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/logout", authController.logout)

router.post("/forgot-password", authController.forgotPassword)
router.patch("/reset-password/:token", authController.resetPassword)

router.use(authController.tokenProtect)

router.get("/my-account", userController.getMyAccount, userController.getUser)
router.patch("/update-password", authController.updatePassword)
router.delete("/delete-me", userController.deleteMe)
router.patch("/update-me",
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe)

router.use(authController.restrictTo("admin"))

router.route("/").get(userController.getAllUsers)
router.route("/:id")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router;