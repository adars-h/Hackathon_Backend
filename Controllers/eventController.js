const { getEvents, createEvent } = require("../DB/models/Events");
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
    const date_dt = new Date(date);
    try {
        const result = await createEvent(name, date_dt, section, type);
        res.send({ code: 200, data: "Event created" });
    } catch (err) {
        next(err);
    }
}
module.exports = { getEventsController, createEventController };
