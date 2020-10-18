const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user.controller");
const { getPostById, getPost, createPost, getAllPosts, getAllpostsByUser } = require("../controllers/post.controller");
const { route } = require("./auth.route");

//params
router.param("userId", getUserById);
router.param("postId", getPostById);

//routes
//create
router.post("/post/create/:userId", createPost);

router.post("/post/:postId/", getPost);

//read
router.get("/post/all/", getAllPosts);

router.get("/post/:userId", getAllpostsByUser);


module.exports = router;