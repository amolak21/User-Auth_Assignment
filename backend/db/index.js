const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
  username: { type: String, requires: true, unique: true },
  email: { type: String, requires: true, unique: true },
  password: { type: String, requires: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
