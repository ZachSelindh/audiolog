const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  description: { type: String, required: true },
  submitted_at: { type: Date, required: true, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
