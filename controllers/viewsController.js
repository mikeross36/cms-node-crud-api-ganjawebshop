"use strict"
const handleAsync = require("./../utils/handleAsync")
const ErrorResponse = require("./../utils/ErorrResponse")
const Page = require("./../models/pageModel")
const Ganja = require("./../models/ganjaModel")
const Category = require("./../models/categoryModel")
const TeamMember = require("./../models/teamMemberModel")
const Podcast = require("./../models/podcastModel")
const User = require("./../models/userModel")
const Cart = require("./../models/cartModel")
const crypto = require("crypto")
const cartRepo = require("./../utils/cartRepo")

exports.getIndexPage = handleAsync(async (req, res, next) => {
    const page = await Page.findOne({ slug: "home" })
    if (!page) {
        return next(new ErrorResponse("Page not found", 404))
    }
    res.status(200).render("index", {
        page: page,
        title: page.title,
        content: page.content,
        imageCover: page.imageCover
        
    })
});

exports.getEachPage = handleAsync(async (req, res, next) => {
    const page = await Page.findOne({ slug: req.params.slug })
    if (!page) {
        return next(new ErrorResponse("Page not found", 404))
    }
    res.status(200).render("index", {
        page: page,
        title: page.title,
        content: page.content,
        imageCover: page.imageCover,
    })
});

exports.getPodcast = handleAsync(async (req, res, next) => {
    const podcasts = await Podcast.find();
    if (!podcasts) {
        return next(new ErrorResponse("Podcast not found", 404))
    }
    res.status(200).render("podcast", {
        title: "Podcasts",
        podcasts: podcasts
    })
});

exports.getTeam = handleAsync(async (req, res, next) => {
    const teamMembers = await TeamMember.find()
    if (!teamMembers) {
        return next(new ErrorResponse("Team not found!", 404))
    }
    res.status(200).render("team", {
        title: "Our team",
        teamMembers: teamMembers
    })
});

exports.getCategories = handleAsync(async (req, res, next) => {
    const categories = await Category.find();
    if (!categories) {
        return next(new ErrorResponse("Categories not found!", 404))
    }
    res.status(400).render("categories", {
        title: "Categories",
        categories: categories
    })
});

exports.getProductsByCategories = handleAsync(async (req, res, next) => {
    const category = await Category.findOne({ slug: req.params.slug })
    if (!category) {
        return next(new ErrorResponse("Product not found", 404))
    }
    res.status(200).render("productsByCategories", {
        title: category.name,
        category: category
    })
});

exports.getProductsReviews = handleAsync(async (req, res, next) => {
    const product = await Ganja.findOne({ slug: req.params.slug }).populate({
        path: "reviews",
        fields: "content rating user"
    })
    if (!product) {
        return next(new ErrorResponse("Review not found", 404))
    }
    res.status(200).render("reviewsByProduct", {
        title: `${product.name} review`,
        product: product
    })
})

exports.getOurProducts = handleAsync(async (req, res, next) => {
    const products = await Ganja.find()
    if (!products) {
        return next(new ErrorResponse("Products not found", 404))
    }
    res.status(200).render("ourproducts", {
        title: "Our products",
        products: products
    })
})

exports.getProduct = handleAsync(async (req, res, next) => {
    const product = await Ganja.findOne({ slug: req.params.slug }).populate({
        path: "reviews",
        fields: "content rating user"
    })
    if (!product) {
        return next(new ErrorResponse("Product not found", 404))
    }
    res.status(200).render("product", {
        title: product.title,
        product: product,
    })
});

exports.getUser = handleAsync(async (req, res, next) => {
    const user = await User.findOne({ id: req.body.id })
    if (!user) {
        return next(new ErrorResponse("User not found!", 404))
    }
    res.locals.user = req.user || null;
    next()
});

exports.getRegisterForm = (req, res) => {
    res.status(200).render("register", {
        title: "Register"
    })
};

exports.getLoginForm = (req, res) => {
    res.status(200).render("login", {
        title: "Login"
    })
};

exports.getForgotForm = (req, res) => {
    res.status(200).render("forgot", {
        title: "Enter Email"
    })
};

exports.getResetPassForm = handleAsync(async (req, res, next) => {
    const resetTokenString = req.params.token;
    const hashResetToken = crypto.createHash("sha256").update(resetTokenString).digest("hex")

    const validToken = await User.findOne({
        passwordResetToken: hashResetToken,
        passwordResetExpires: {$gt: Date.now()}
    })
    if (!validToken) {
        return next(new ErrorResponse("Token invalid or expired!", 400))
    }
    res.status(200).render("resetPassword", {
        title: "Reset your password",
        token: validToken,
    })
});

exports.getAccount = (req, res) => {
    res.status(200).render("account", {
        title: "My account"
    })
};

exports.getCart = handleAsync(async (req, res, next) => {
    let cart = await cartRepo.cart();
    res.status(200).render("checkout", {
        title: "Your cart",
        cart: cart
    })
});
