const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const SessionSchema = new Schema({
  id: { type: Number },
  name: { type: String, required: true },
  presenter: { type: String, required: true },
  duration: { type: Number, required: true },
  level: { type: String, required: true },
  abstract: { type: String, required: true },
  voters: { type: Array, requires: true },
});

module.exports = mongoose.model("Session", SessionSchema);
