"use strict"
const factory = require("./factoryController")
const Ganja = require("./../models/ganjaModel")
const multer = require("multer")
const handleAsync = require("./../utils/handleAsync")

exports.getAllGanjas = factory.getAll(Ganja);
exports.getGanja = factory.getOne(Ganja, { path: "reviews" });
exports.createGanja = factory.createOne(Ganja);
exports.updateGanja = factory.updateOne(Ganja);
exports.deletGanja = factory.deleteOne(Ganja)


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

exports.uploadGanjaImage = upload.single("coverImage");

exports.resizeGanjaImage = handleAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.file.fileName = `ganja-${req.ganja.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize()
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/ganjas/${req.file.fileName}`);
    
    next();
})