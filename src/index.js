const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { connectMongoDB } = require("./config");
const userRouter = require("../routes/user");

const app = express();

//mongodb connection {status:"working", lastUpdated: "30June25/1605hrs"
connectMongoDB("mongodb://localhost:27017/seva")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(() => console.log(`Failed to connect to MongoDB`));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

// start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
