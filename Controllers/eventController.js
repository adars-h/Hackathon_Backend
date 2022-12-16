const {
    getEvents,
    createEvent,
    addCandidate,
    removeCandidate,
    updateScoreCandidate,
} = require("../DB/models/Events");
async function getEventsController(req, res, next) {
    const { section } = req.body;
    try {
        const result = await getEvents(section);
        res.send({ code: 200, data: result });
    } catch (err) {
        next(err);
    }
}
async function createEventController(req, res, next) {
    const { name, date, section, type } = req.body;
    try {
        const result = await createEvent(name, date, section, type);
        res.send({ code: 200, data: "Event created" });
    } catch (err) {
        next(err);
    }
}
async function registerCandidate(req, res, next) {
    const { username, eventID } = req.body;
    try {
        const result = await addCandidate(eventID, username);
        res.send({ code: 200, message: "Registered to event successfully" });
    } catch (err) {
        next(err);
    }
}
async function deregisterCandidate(req, res, next) {
    const { username, eventID } = req.body;
    try {
        const result = await removeCandidate(eventID, username);
        res.send({ code: 200, message: "DeRegistered to event successfully" });
    } catch (err) {
        next(err);
    }
}
async function updateScore(req, res, next) {
    const { username, score, eventID } = req.body;
    try {
        const result = await updateScoreCandidate(eventID, username, score);
        res.send({ code: 200, message: "score updated" });
    } catch (err) {
        next(err);
    }
}
module.exports = {
    getEventsController,
    createEventController,
    registerCandidate,
    deregisterCandidate,
    updateScore,
};
