const { Router } = require("express");
const {
    getEventsController,
    createEventController,
    getEventsByIdController,
    getScoreController,
    registerCandidate,
    deregisterCandidate,
    updateScore,
} = require("../Controllers/eventController");

const eventsRouter = Router();

eventsRouter.post("/getEvents", getEventsController);
eventsRouter.get("/getQuestions", getEventsByIdController);
eventsRouter.post("/getScore", getScoreController);
eventsRouter.post("/createEvent", createEventController);
eventsRouter.post("/register", registerCandidate);
eventsRouter.post("/deregister", deregisterCandidate);
eventsRouter.post("/updateScore", updateScore);
module.exports = eventsRouter;
