const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const dotenv = require("dotenv");
var path = require("path");
dotenv.config();

var port = process.env.PORT || "3002";
app.set("port", port);

const mongoURI = "mongodb://localhost:27017/shopping";

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//middlewware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(expressValidator());
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const reviewsRoutes = require("./routes/reviews");
const commentRoutes = require("./routes/comment");
const ProductsRoutes = require("./routes/Products");
const ItemsRoute = require("./routes/items");
const ImageRouter = require("./routes/image");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../src/assets/Images")));
const cardRoutes = require("./routes/card");
const transactionRoutes = require("./routes/transaction");

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", reviewsRoutes);
app.use("/", commentRoutes);
app.use("/", ProductsRoutes);
app.use("/", ItemsRoute);
app.use("/image", ImageRouter);
app.use("/", cardRoutes);
app.use("/", transactionRoutes);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized!" });
  }
});

app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
