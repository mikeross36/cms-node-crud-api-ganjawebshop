"use strict"
const TeamMember = require("./../models/teamMemberModel")
const factory = require("./factoryController")

exports.getAllTeamMembers = factory.getAll(TeamMember)
exports.getTeamMember = factory.getOne(TeamMember)
exports.createTeamMember = factory.createOne(TeamMember)
exports.updateTeamMember = factory.updateOne(TeamMember)
exports.deleteTeamMember = factory.deleteOne(TeamMember)