const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    contentLink: {
      type: String,
      required: true
    },
    postedBy: {
      type: ObjectId,
      ref: "User"
    },
    likes: {
      type: Number,
      default: 0
    },
    comment: [{
      type: ObjectId,
      ref: "Comment"
    }],
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);