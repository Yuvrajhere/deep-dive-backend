const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    userName: {
      type: String,
      trim: true,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);