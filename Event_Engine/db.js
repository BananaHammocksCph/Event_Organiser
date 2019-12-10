const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ratingSchema = new mongoose.Schema({
  Score: Number,
  Created: { type: Date }
});

var userSchema = new mongoose.Schema({
  Name: String,
  Events: [{ type: Schema.Types.ObjectId, ref: "event" }],
  Event_Owner: [{ type: Schema.Types.ObjectId, ref: "event" }],
  Email: { type: String, unique: true, required: true }, 
  Password: String
});

var eventSchema = new mongoose.Schema({
  Description: String,
  Users: [{ type: Schema.Types.ObjectId, ref: "user" }],
  Type: {
    type: String,
    enum: ["MEETING", "PARTY", "LECTURE"],
    default: "MEETING"
  },
  Catering: Boolean,
  Catering_Desc: String,
  Date: Date,
  Location: String,
  Ratings: [{ type: Schema.Types.ObjectId, ref: "rating" }],
  Created: { type: Date }
});


eventSchema.pre("save", function(next) {
  this.Created = Date.now();
  next();
});

ratingSchema.pre("save", function(next) {
  this.Created = Date.now();
  next();
});

module.exports = { Mongoose: mongoose, EventSchema: eventSchema , UserSchema: userSchema, RatingSchema: ratingSchema  }