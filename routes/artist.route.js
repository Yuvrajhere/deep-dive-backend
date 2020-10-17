const express = require("express");
const router = express.Router();

const { getArtistById, createArtist, getArtist, getAllArtists } = require("../controllers/artist.controller");
const { getUserById } = require("../controllers/user.controller");

//params
router.param("userId", getUserById);
router.param("artistId", getArtistById);

//routes
//create
router.post("/artist/create/:userId", createArtist);

//read
router.get("/artist/:artistId", getArtist);

//listing route
router.get("/artists", getAllArtists);

module.exports = router;