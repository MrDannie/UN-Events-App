//  FSSqNflRMTTTAhzf
//  mongodb + srv://MrDan-UNEvents:<password>@un-events-xzskq.mongodb.net/test?retryWrites=true&w=majority
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const eventsRoute = require("./routes/events");

// MongoDb config goes here
mongoose
  .connect(
    "mongodb+srv://MrDan-UNEvents:FSSqNflRMTTTAhzf@un-events-xzskq.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("App succesfully connect to database!!");
  })
  .catch((error) => {
    console.log("Unable to connect to mongoDB");
    console.error(error);
  });

// HERe

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Expose-Headers", "X-InlineCount");

  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/events", eventsRoute);

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

module.exports = app;

const port = process.env.PORT || 5000;
const http = require("http");

const server = http.createServer(app);

server.listen(process.env.PORT || port, () => {
  console.log("Express listening on port " + port + " Thank You");
});
