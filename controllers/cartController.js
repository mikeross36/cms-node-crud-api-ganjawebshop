"use strict"
const handleAsync = require("./../utils/handleAsync.js")
const ErrorResponse = require("./../utils/ErorrResponse")
const Ganja = require("./../models/ganjaModel")
const Cart = require("./../models/cartModel")
const cartRepo = require("./../utils/cartRepo")

exports.addItemToCart = handleAsync(async (req, res, next) => {
    const { productId } = req.body;
    const quantity = +parseInt(req.body.quantity);

    const product = await Ganja.findById(productId);
    if (!product) {
        return next(new ErrorResponse("Product not found!", 404))
    }

    let cart = await cartRepo.cart();
    if (cart) {
        const productIndex = cart.items.findIndex(item => {
            return item.productId.id === productId;
        })
        if (productIndex !== -1 && quantity <= 0) {
            cart.items.splice(productIndex, 1)
            if (cart.items.length === 0) {
                cart.subTotal = 0;
            } else {
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, curr) => acc + curr)
            }
        }
        else if (productIndex !== -1) {
            let cartItem = cart.items[productIndex]
            cartItem.quantity = cartItem.quantity + quantity;
            cartItem.total = cartItem.quantity * product.price;
            cartItem.price = product.price;
            cartItem.coverImage = product.coverImage;
            cart.items[productIndex] = cartItem;
            cart.subTotal = cart.items.map(item => item.total).reduce((acc, curr) => acc + curr)
        }
        else if (quantity > 0) {
            cart.items.push({
                productId: productId,
                quantity: quantity,
                price: product.price,
                total: +parseInt(quantity * product.price),
                coverImage: product.coverImage
            })
            cart.subTotal = cart.items.map(item => item.total).reduce((acc, curr) => acc + curr)
        }
        else {
            return next(new ErrorResponse("Invalid request", 400))
        }
        cart = await cart.save()
        res.status(200).json({
            status: "success",
            data: {
                cart: cart
            }
        })
    }
    else {
        const cartData = {
            items: [
                {
                    productId: productId,
                    quantity: quantity,
                    total: +parseInt(quantity * product.price),
                    price: product.price,
                    coverImage: product.coverImage
                }
            ],
            subTotal: parseInt(quantity * product.price)
        }
        cart = await Cart.create(cartData)
        if (!cart) {
            return next(new ErrorResponse("Cart not created!", 400))
        }
        res.status(201).json({
            status: "success",
            data: {
                cart: cart
            }
        })
    }
});

exports.getCart = handleAsync(async (req, res, next) => {
    const cart = await cartRepo.cart();
    if (!cart) {
        return next(new ErrorResponse("Cart not found"))
    }
    res.status(200).json({
        status: "success",
        results: cart.items.length,
        data: {
            cart: cart
        }
    })
});

exports.updateCart = handleAsync(async (req, res, next) => {
    const { productId } = req.body;
    const action = req.quary.action;

    const cart = await cartRepo.cart()
    if (cart) {
        const productIndex = cart.item.findIndex(item => {
            return item.productId.id === productId;
        })
        if (productIndex !== -1) {
            const cartItem = cart.items[productIndex]
            switch (action) {
                case "increase":
                    cartItem.quantity++;
                    break;
                case "decrease":
                    cartItem.quantity--;
                    break;
                case "remove":
                    cart.items.splice(cartItem, 1);
                    if (cart.items.length === 0) {
                        await Cart.findByIdAndDelete(req.cart.id)
                    }
                    break;
                default: console.log("Error ")
            }
        }
    }
})

exports.removeItemFromCart = handleAsync(async (req, res, next) => {
    const { productId } = req.body;
    
    let cart = await cartRepo.cart();
    if (cart) {
        const productIndex = cart.items.findIndex(item => {
            return item.productId.id === productId;
        })
        if (productIndex !== -1) {
            cart.items.splice(productIndex, 1)
            cart = await cart.save();
            res.status(200).json({
                status: "success",
                data: {
                    cart: cart
                }
            })
        }
    }
    else {
        return next(new ErrorResponse("Cart not found"))
    }
});

exports.increaseQuantity = handleAsync(async (req, res, next) => {
    const { productId } = req.body;

    const product = await Ganja.findById(productId);
    if (!product) {
        return next(new ErrorResponse("Product not found!", 404))
    }
    let cart = await cartRepo.cart();
    if (cart) {
        const productIndex = cart.items.findIndex(item => {
            return item.productId.id === productId;
        })
        if (productIndex !== -1) {
            let cartItem = cart.items[productIndex]
            cartItem.quantity = cartItem.quantity + 1;
            cartItem.total = cartItem.quantity * product.price;
            cartItem.price = product.price;
            cartItem.coverImage = product.coverImage;
            cart.subTotal = cart.items.map(item => item.total).reduce((acc, curr) => acc + curr)
        }
        cart = await cart.save();
        res.status(200).json({
            stauts: "success",
            data: {
                cart: cart
            }
        })
    }
    else {
        return next(new ErrorResponse("Cart not found", 404))
    }
});

exports.decreaseQuantity = handleAsync(async (req, res, next) => {
    const { productId } = req.body;

    const product = await Ganja.findById(productId)
    if (!product) {
        return next(new ErrorResponse("Product not found!", 404))
    }
    let cart = await cartRepo.cart();
    if (cart) {
        const productIndex = cart.items.findIndex(item => {
            return item.productId.id === productId;
        })
        if (productIndex !== -1) {
            let cartItem = cart.items[productIndex];
            cartItem.quantity = cartItem.quantity - 1;
            cartItem.total = cartItem.quantity * product.price;
            cartItem.price = product.price;
            cartItem.coverImage = product.coverImage;
            cart.subTotal = cart.items.map(item => item.total).reduce((acc, curr) => acc + curr)

            if (cartItem.quantity <= 0) {
                cart.items.splice(productIndex, 1)
            }
            cart = await cart.save();
            res.status(200).json({
                status: "success",
                data: {
                    cart: cart
                }
            })
        }
    }
    else {
        return next(new ErrorResponse("Cart not found", 404))
    }
});

exports.clearCart = handleAsync(async (req, res, next) => {
    const cart = await cartRepo.cart();
    if (!cart) {
        return next(new ErrorResponse("Cart not found!", 404))
    }
    const clear = async () => {
        cart.items = []
        cart.subTotal = 0
        await cart.save()

        res.status(200).json({
            status: "success",
            results: cart.items.length,
            data: {
                cart: cart
            }
        })
    }
    await clear();
});


