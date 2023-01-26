"use strict"
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const hpp = require("hpp")
const cors = require("cors")
const compression = require("compression")
const bodyParser = require("body-parser")

const ErrorResponse = require("./utils/ErorrResponse")
const globalErrorHandler = require("./utils/globalErrorHandler")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))

app.use(cors());
app.options("*", cors());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"))

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }));

const Page = require("./models/pageModel");
const addPages = async () => {
  try {
    const pages = await Page.find();
    if (!pages) {
      return new ErrorResponse("Pages not found", 404);
    }
    app.locals.pages = pages;
  }
  catch (error) {
    return new ErrorResponse(`${error}`, 500);
  }
};

const cartRepo = require("./utils/cartRepo")
const addCart = async () => {
  try {
    const cart = await cartRepo.cart();
    if (!cart) {
      return new ErrorResponse("Cart not found", 404)
    }
    app.locals.cart = cart;
  }
  catch (error) {
    return new ErrorResponse(`${error}`, 500)
  }
};

app.use((req, res, next) => {
  addPages()
  addCart()
  next()
});

const viewsRouter = require("./routes/viewsRoutes")
const pageRouter = require("./routes/pageRoutes")
const userRouter = require("./routes/userRoutes")
const categoryRouter = require("./routes/categoryRoutes")
const ganjaRouter = require("./routes/ganjaRoutes")
const reviewRouter = require("./routes/reviewRoutes")
const teamMemberRouter = require("./routes/teamMemberRoutes")
const podcastRouter = require("./routes/podcastRoutes")
const cartRouter = require("./routes/cartRoutes")

app.use("/", viewsRouter)
app.use("/api/v1/ganjas", ganjaRouter)
app.use("/api/v1/pages", pageRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/team-members", teamMemberRouter)
app.use("/api/v1/podcasts", podcastRouter)
app.use("/api/v1/cart", cartRouter)

app.all("*", (req, res, next) => {
  next(new ErrorResponse(`Cannot find ${req.originalUrl} on this server!`, 404))
});

app.use(globalErrorHandler)

module.exports = app;