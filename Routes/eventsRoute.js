const { Router } = require("express");
const {
    getEventsController,
    createEventController,
    getEventsByIdController,
    getScoreController
} = require("../Controllers/eventController");

const eventsRouter = Router();

eventsRouter.post("/getEvents", getEventsController);
eventsRouter.get("/getQuestions", getEventsByIdController);
eventsRouter.post("/getScore", getScoreController);
eventsRouter.post("/createEvent", createEventController);
module.exports = eventsRouter;
