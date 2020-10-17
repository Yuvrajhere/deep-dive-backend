const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
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
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    artist: {
      type: ObjectId,
      ref: "Artist",
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
      text: String,
      postedBy: {
          type: ObjectId,
          ref: "User"
      }
    }],
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);