const express = require("express");
const router = express.Router();

const { getUserById, getUser } = require("../controllers/user.controller");
const { getPostById, getPost, createPost, getAllPosts } = require("../controllers/post.controller");

//params
router.param("userId", getUserById);
router.param("postId", getPostById);

//routes
//create
router.post("/post/create/:userId", createPost);

router.post("/post/:postId/:userId", getUser);

//read
router.get("/post/all/:userId", getAllPosts);


module.exports = router;