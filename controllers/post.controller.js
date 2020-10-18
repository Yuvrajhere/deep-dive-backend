const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

exports.getPostById = (req, res, next, id) => {
  Post.findById(id)
    .populate("category")
    .populate("postedBy")
    .populate("comment.postedBy")
    .exec((err, post) => {
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
      console.log(err);
      return res.status(400).json({
        error: "Failed to save your post in DB"
      });
    }
    res.json(post);
  })
};

exports.getAllPosts = (req, res) => {
  Post.find()
    .sort({createdAt: 'desc'})
    .populate("category")
    .populate("postedBy")
    .populate("comment")
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

exports.getAllpostsByUser = (req, res) => {
  console.log(req.profile._id);
  Post.find({ postedBy: req.profile._id})
    .sort({createdAt: 'desc'})
    .populate("category")
    .populate("postedBy")
    .populate("comment")
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

exports.addComment = (req, res) => {
  const userId = req.profile._id;
  
  const { text } = req.body;

  const comment = new Comment({
    text: text,
    user: userId,
    userName: req.profile.username
  });

  comment.save((err, comment) => {
    if(err) {
      console.log(err);
      return res.status(400).json({
        error: "Failed to save your comment in DB"
      });
    }
    Post.findOneAndUpdate(
      { _id: req.post._id }, 
      { $push: { comment: comment._id } },
      (error, success) => {
           if (error) {
               console.log(error);
               return res.status(400).json({
                error: "Failed to save your comment in DB"
              });
           } else {
               console.log(success);
           }
       });
    res.json(comment);
  });
}