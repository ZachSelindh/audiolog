const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  photoURL: { type: String, required: true },
  email: { type: String, required: true },
  created_at: { type: Date, default: Date.now, required: true }
});

const User = mongoose.model("registered-users", userSchema);

module.exports = User;
