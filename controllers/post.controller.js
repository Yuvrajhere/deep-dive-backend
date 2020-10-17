const Post = require("../models/post.model");

exports.getPostById = (req, res, next, id) => {
  Post.findById(id)
    .populate("category")
    .populate("artist")
    .populate("postedBy")
    .populate("comment.postedBy")
    .exec((err, order) => {
      if(err) {
        return res.status(400).json({
          error: "NO post found in DB"
        });
      }
      req.post = post;
      next();
    });
  };

exports.getPost = () => {
  return res.json(req.post);
}

exports.createPost = (req, res) => {
  req.body.postedBy = req.profile._id;
  const post = new Post(req.body);
  post.save((err, post) => {
    if(err) {
      return res.status(400).json({
        error: "Failed to save your post in DB"
      });
    }
    res.json(post);
  })
};

exports.getAllPosts = (req, res) => {
  Post.find()
    .populate("category")
    .populate("artist")
    .populate("postedBy")
    .populate("comment.postedBy")
    .exec((err, post) => {
      if(err) {
        return res.status(400).json({
          error: "No post found in DB"
        });
      } else if(post.length < 1) {
        return res.status(400).json({
          message: "No post found in DB"
        });
      }
      res.json(post);
    });
};