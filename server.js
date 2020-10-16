const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`mongoDB connection established successfully.`);
});

//importing routers
const authRoutes = require("./routes/auth.route");

//using routes
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});