const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/seva");
connect
  .then(() => {
    console.log("mongodb connected successfully");
  })
  .catch(() => {
    console.log("failed to connect to mongodb");
  });

const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  //congirm password zurat nai hota hai db mai
  // confirmPassword: {
  //   type: String,
  //   required: true,
  // },
});

const collection = new mongoose.model("users", logInSchema);
module.exports = collection;
