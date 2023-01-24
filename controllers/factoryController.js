"use strict"
const handleAsync = require("./../utils/handleAsync")
const QueryHandler = require("./../utils/QueryHandler")
const ErrorResponse = require("./../utils/ErorrResponse")

exports.deleteOne = Model => {
    return handleAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id)
        if (!doc) {
            return next(new ErrorResponse(`Document ${Model} not found!`, 404))
        }
        res.status(204).json({
            status: "success",
            data: null
        })
    })
};

exports.updateOne = Model => {
    return handleAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body)
        if (!doc) {
            return next(new ErrorResponse(`Document ${Model} not found!`, 404))
        }
        res.status(200).json({
            status: "success",
            data: {
                data: doc
            }
        })
    })
};

exports.createOne = Model => {
    return handleAsync(async (req, res, next) => {
        const doc = await Model.create(req.body)
        if (!doc) {
            return next(new ErrorResponse(`Document ${Model} not found!`, 404))
        }
        res.status(201).json({
            status: "success",
            data: {
                data: doc
            }
        })
    })
};

exports.getOne = (Model, populateOptions) => {
    return handleAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id)
        if (populateOptions) query = query.populate(populateOptions)
        const doc = await query;

        if (!doc) {
            return next(new ErrorResponse(`Document ${Model} not found!`, 404))
        }
       
        res.status(200).json({
            status: "success",
            data: {
                data: doc
            }
        })
    })
};

exports.getAll = Model => {
    return handleAsync(async (req, res, next) => {
        const handler = new QueryHandler(Model.find(), req.query)
            .filterFind()
            .sortBy()
            .selectFields()
            .paginate();

        const doc = await handler.query;

        res.status(200).json({
            status: "success",
            results: doc.length,
            data: {
                data: doc
            }
        })
    })
};