const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { connectMongoDB } = require("./config");
const userRouter = require("../routes/user");
const bookingRouter = require("../routes/booking");
const profileRouter = require("../routes/profile");
const session = require("express-session");
const methodOverride = require("method-override");

const app = express();

//mongodb connection {status:"working", lastUpdated: "30June25/1605hrs"
connectMongoDB("mongodb://localhost:27017/seva")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(() => console.log(`Failed to connect to MongoDB`));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(methodOverride("_method"));

// Middleware to set req.user from session
app.use(async (req, res, next) => {
  if (req.session.userId) {
    try {
      req.user = await User.findById(req.session.userId);
    } catch (e) {
      req.user = null;
    }
  }
  next();
});

app.use("/", userRouter);
app.use("/booking", bookingRouter);

app.use("/profile", profileRouter);

app.get('/booking-history', (req, res) => {
  res.render('booking-history');
});

// start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on : http://localhost:${port}`);
});
