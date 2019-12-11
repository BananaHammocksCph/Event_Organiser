const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();
const mongoose = require("mongoose");

const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect("mongodb://127.0.0.1:27017/user-ip", option).then(
  function() {
    console.log("Connected to database");
  },
  function(err) {
    console.log("Not connected to database " + err);
  }
);

app.use(bodyParser.json({ type: "application/json" }));
app.use(cors());

const port = process.env.port || 3001;

app.get("/", function(req, res) {
  res.json("Hello world!\n");
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

module.exports = app;
