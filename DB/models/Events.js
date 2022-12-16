const mongoose = require("mongoose");
const EventsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "discussion",
        required: true,
    },
    candidatesInfo: [
        {
            username: {
                type: String,
                required: true,
            },
            score: {
                type: Number,
                required: true,
            },
        },
    ],
});

const Events = mongoose.model("Events", EventsSchema);

async function getEvents(section) {
    console.log("section : ", section);
    const data = await Events.find({ section: section });
    return data;
}
async function createEvent(name, date, section, type) {
    console.log(name, date, section, type);
    const res = await Events.create({
        name: name,
        date: date,
        section: section,
        type: type,
    });
    return res;
}
module.exports = {
    getEvents,
    createEvent,
};
