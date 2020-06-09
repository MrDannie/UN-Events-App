const express = require("../node_modules/express");
const router = express.Router();
const eventsContoller = require("../controller/events");

router.get("/", eventsContoller.getAllEvent);
router.get("/:id", eventsContoller.getSingleEvent);
router.post("/", eventsContoller.saveEvent);
router.put("/:id", eventsContoller.updateEvent);
router.delete("/:id", eventsContoller.deleteEvent);
module.exports = router;
