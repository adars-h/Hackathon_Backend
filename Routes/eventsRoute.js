const { Router } = require("express");
const {
    getEventsController,
    createEventController,
} = require("../Controllers/eventController");

const eventsRouter = Router();

eventsRouter.post("/getEvents", getEventsController);
eventsRouter.post("/createEvent", createEventController);
module.exports = eventsRouter;
