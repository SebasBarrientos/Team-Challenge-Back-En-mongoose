const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please fill in your username"],
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "This email is not valid"],
      required: [true, "Please fill in your email"],
    },
    password: {
      type: String,
      required: [true, "Please fill in your password"],
    },
    tokens: [],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
