// models/User.js
const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
  credentialID: String,
  publicKey: String,
  counter: Number,
});

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  credentials: [credentialSchema],
});

module.exports = mongoose.model("User", userSchema);
