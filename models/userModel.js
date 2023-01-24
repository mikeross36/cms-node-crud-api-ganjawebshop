"user strict"
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "User name is mandatory"]
        },
        email: {
            type: String,
            required: [true, "Email is mandatory"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Email is not valid!"]
        },
        photo: {
            type: String,
            default: "default.jpg"
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        password: {
            type: String,
            required: [true, "Password is mandatory!"],
            min: 8,
            select: false
        },
        passwordConfirm: {
            type: String,
            required: [true, "Please confirm your password!"],
            validate: {
                validator: function (value) {
                    return value === this.password
                },
                message: "Passwords do not match!"
            }
        },
        active: {
            type: Boolean,
            default: true,
            select: false
        },
        passwordResetToken: String,
        passwordResetExpires: Date,
        passwordChangedAt: Date
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;
    next()
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) next();
    this.passwordChangedAt = Date.now() - 1000;
    next()
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } })
    next()
});

userSchema.methods.matchPassword = async function (loginPassword, userPassword) {
    const isMatch = await bcrypt.compare(loginPassword, userPassword)
    return isMatch;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetTokenString = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash("sha256").update(resetTokenString).digest("hex")
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetTokenString;
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp
    }
    else false;
};

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(item => {
        return item.productId.toString() === product._id.toString();
    })
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items]

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    }
    else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        })
    }

    const updatedCart = { items: updatedCartItems }
    this.cart = updatedCart;
    return this.save()
};

userSchema.methods.removeFromCart = function (productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save()
};

userSchema.methods.clearCart = function () {
    this.cart.items = [];
    return this.save();
};

const User = mongoose.model("User", userSchema)

module.exports = User;
