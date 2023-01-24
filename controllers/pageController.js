"use strict"
const factory = require("./factoryController")
const Page = require("./../models/pageModel");
const handleAsync = require("../utils/handleAsync");
const ErrorResponse = require("../utils/ErorrResponse");

exports.getAllPages = factory.getAll(Page);
exports.getPage = factory.getOne(Page);
exports.createPage = factory.createOne(Page);
exports.updatePage = factory.updateOne(Page);
exports.deletePage = factory.deleteOne(Page);


const sortPages = async (ids, cb) => {
    
    let count = 0;
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        count++;
        const page = await Page.findById(id)
        page.sorting = count;
        page.save(() => {
            ++count;
            if (count >= ids.length) {
                cb()
            }
        })
    }
}

exports.reorderPages = handleAsync(async (req, res, next) => {
    console.log(req.body)
    const ids = req.body["id[]"];
    const pages = await Page.find().sort({ sorting: 1 })
    
    if (!pages) {
        return next(new ErrorResponse("Pages to reorder not found!", 404))
    }

    sortPages(ids, () => {
        res.locals.pages = pages
    })
});
