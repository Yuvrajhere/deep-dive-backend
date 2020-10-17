const Artist = require("../models/artist.model");

exports.getArtistById = (req, res, next, id) => {
  Artist.findById(id)
    .populate("category")
    .exec((err, artist) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }

      req.artist = artist;
      next();
    });
};

exports.createArtist = (req, res) => {
  //destructure the body
  const { name, description, contentLink, category } = req.body;

  if (!name || !description || !contentLink || !category) {
    return res.status(400).json({
      error: "Please include all fields",
    });
  }

  let artist = new Artist(req.body);

  //save to the DB
  artist.save((err, artist) => {
    if (err) {
      return res.status(400).json({
        error: "Saving artist in DB failed",
      });
    }
    res.json(artist);
  });
};

exports.getArtist = (req, res) => {
  return res.json(req.artist);
};

//artist listing
exports.getAllArtists = (req, res) => {
  Artist.find()
    .populate("category")
    .exec((err, artists) => {
      if (err) {
        return res.status(400).json({
          error: "NO artist found",
        });
      }
      res.json(artists);
    });
};
