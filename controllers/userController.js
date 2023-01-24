"use strict"
const factory = require("./factoryController")
const User = require("./../models/userModel")
const handleAsync = require("./../utils/handleAsync")
const ErrorResponse = require("./../utils/ErorrResponse")
const multer = require("multer")
const sharp = require("sharp")

exports.getAllUsers = factory.getAll(User)
exports.getUser = factory.getOne(User)
exports.updateUser = factory.updateOne(User)
exports.deleteUser = factory.deleteOne(User)

const filterObj = (obj, ...allowedFields) => {
    let newObj = {};
    const fieldNames = Object.keys(obj)
    fieldNames.forEach(field => {
        if (allowedFields.includes(field)) newObj[field] = obj[field]
    })
    return newObj;
};

exports.updateMe = handleAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new ErrorResponse("You cannot update your password here!", 401))
    }

    async function setUpdate() {
        const filteredBody = filterObj(req.body, "name", "email")
        if (req.file) filteredBody.photo = req.file.fileName;
        
        const updatedMe = await User.findByIdAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true
        })
        return updatedMe;
    }

    const updatedMe = await setUpdate()
    res.status(200).json({
        status: "success",
        data: {
            user: updatedMe
        }
    })
});

exports.getMyAccount = (req, res, next) => {
    req.params.id = req.user.id;
    next()
};

exports.deleteMe = handleAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, { active: false });
    if (!user) {
        return next(new ErrorResponse("User not found!", 404))
    }
    res.status(204).json({
        status: "success",
        data: null
    })
});

// frontend
const multerStorage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    }
    else {
        cb(new ErrorResponse("File is not an image!", 400), false)
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: imageFilter
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = handleAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.file.fileName = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize()
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/users/${req.file.fileName}`);
    
    next();
})