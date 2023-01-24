"use strict"
const express = require("express")
const router = express.Router()
const teamMemberController = require("./../controllers/teamMemberController")
const authController = require("./../controllers/authController")

router.use(authController.tokenProtect, authController.restrictTo("admin"))

router.route("/")
    .get(teamMemberController.getAllTeamMembers)
    .post(teamMemberController.getTeamMember)

router.route("/:id")
    .get(teamMemberController.getTeamMember)
    .patch(teamMemberController.updateTeamMember)
    .delete(teamMemberController.updateTeamMember)

module.exports = router;