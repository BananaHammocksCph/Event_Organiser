
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require( './routes');
require("dotenv").config();

var mongoose = require('mongoose');
var connection = mongoose
  .connect("mongodb://127.0.0.1:27017/event-organiser")
  .catch(error => console.log(error));

app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());

const port = process.env.port || 3001;

app.get('/',function(req, res){
  res.json('Hello world!\n');
});

app.use('/api', routes);

app.listen(port , () => {
  console.log(`Server running on ${port}`);
});

module.exports = app;