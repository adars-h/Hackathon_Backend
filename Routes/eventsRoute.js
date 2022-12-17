const { Router } = require("express");
const {
    getEventsBySectionController,
    createEventController,
    getQuestionsByIdController,
    calculateScoreController,
    registerCandidate,
    deregisterCandidate,
    updateScore,
    getScoreController,
    getCandidatesByIdController,
} = require("../Controllers/eventController");

const eventsRouter = Router();

eventsRouter.post("/getEvents", getEventsBySectionController);
eventsRouter.get("/getQuestions", getQuestionsByIdController);
eventsRouter.post("/getCandidates", getCandidatesByIdController);
eventsRouter.post("/calculateScore", calculateScoreController);
eventsRouter.post("/getScore", getScoreController);
eventsRouter.post("/createEvent", createEventController);
eventsRouter.post("/register", registerCandidate);
eventsRouter.post("/deregister", deregisterCandidate);
eventsRouter.post("/updateScore", updateScore);
module.exports = eventsRouter;
