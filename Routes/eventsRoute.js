const { Router } = require("express");
const { getEvents } = require("../DB/models/Events");

const eventsRouter = Router();

eventsRouter.get("/getEvents",getEvents);

module.exports = eventsRouter;
