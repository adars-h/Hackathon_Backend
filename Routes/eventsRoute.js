const { Router } = require("express");
const {
    getEventsController,
    createEventController,
    registerCandidate,
    deregisterCandidate,
    updateScore,
} = require("../Controllers/eventController");

const eventsRouter = Router();

eventsRouter.post("/getEvents", getEventsController);
eventsRouter.post("/createEvent", createEventController);
eventsRouter.post("/register", registerCandidate);
eventsRouter.post("/deregister", deregisterCandidate);
eventsRouter.post("/updateScore", updateScore);
module.exports = eventsRouter;
