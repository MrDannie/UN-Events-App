const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Location = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const SessionSchema = new Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  presenter: { type: String, required: true },
  duration: { type: Number, required: true },
  level: { type: String, required: true },
  abstract: { type: String, required: true },
  voters: { type: Array },
});

const EventSchema = new Schema({
  _id: { type: Number },
  name: { type: String, required: true, trim: true },
  date: { type: String, required: true, trim: true },
  time: { type: String, required: true, trim: true },
  budget: { type: Number, required: true },
  imageUrl: { type: String, required: true, trim: true },
  location: Location,
  sessions: [SessionSchema],
});

module.exports = mongoose.model("Events", EventSchema);
