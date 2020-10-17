const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user.controller");
const { getPostById, createPost, getAllPosts } = require("../controllers/post.controller");

//params
router.param("userId", getUserById);
router.param("postId", getPostById);

//routes
//create
router.post("/post/create/:userId", createPost);

//read
router.get("/post/all/:userId", getAllPosts);


module.exports = router;