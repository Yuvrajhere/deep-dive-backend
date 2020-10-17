const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  posts: [{
    post: {
      type: ObjectId,
      ref: "Post",
      default: []
    }
  }]
}, {
  timestamps: true
});

userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.authenticate = (password, encryPassword) => {
  return bcrypt.compareSync(password, encryPassword);
};

module.exports = mongoose.model('User', userSchema);