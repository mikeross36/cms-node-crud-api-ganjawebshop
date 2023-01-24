"use strict"
"use strict"
const Category = require("./../models/categoryModel")
const factory = require("./factoryController")

exports.getAllCategories = factory.getAll(Category)
exports.getCategory = factory.getOne(Category)
exports.createCategory = factory.createOne(Category)
exports.updateCategory = factory.updateOne(Category)
exports.deleteCategory = factory.deleteOne(Category)
