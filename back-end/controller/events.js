const Event = require("../models/event");

exports.getAllEvent = (req, res) => {
  Event.find({})
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.getSingleEvent = (req, res) => {
  const eventId = +req.params.id;
  Event.findOne({ _id: eventId })
    .then((event) => {
      res.status(200).json(event);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.saveEvent = (req, res) => {

  Event.find({})
    .then((allEvents) => {
      var listOfEventId = allEvents.map((event) => event._id);
      var largestId = Math.max.apply(Math, listOfEventId);

      const event = new Event({
        _id: ++largestId,
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        budget: req.body.budget,
        imageUrl: req.body.imageUrl,
        location: {
          address: req.body.location.address,
          city: req.body.location.city,
          country: req.body.location.country,
        },
      });

      event
        .save()
        .then((event) => {
          res.json({
            event: event,
            status: true,
          });
        })
        .then((error) => {
          res.status(404).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.updateEvent = (req, res) => {
  if (!req.body) {
    throw new Error("Event and associated stateId required");
  }

  Event.updateOne(
    { _id: +req.params.id },
    {
      $set: {
        _id: +req.params.id,
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        budget: req.body.budget,
        imageUrl: req.body.imageUrl,
        location: {
          address: req.body.location.address,
          city: req.body.location.city,
          country: req.body.location.country,
        },
        sessions: req.body.sessions,
      },
    }
  )
    .then((event) => {
      console.log(event);
      res.status(201).json({
        event: event,
        status: true,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteEvent = (req, res) => {
  const eventId = +req.params.id;
  Event.deleteOne({ _id: eventId })
    .then(() => {
      res.status(201).json({
        status: true,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};


