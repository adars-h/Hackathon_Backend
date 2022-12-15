const mongoose = require("mongoose");
const EventsSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    candidatesInfo:[{
        username:{
            type:String,
            required:true
        },
        score:{
            type:Number,
            required:true
            
        }
    }]
});

const Events = mongoose.model("Events", EventsSchema);
Events.create({ Name: "Discussion", Date: new Date(), section: "codeforces" });
async function getEvents() {
    const data = await Events.find();
    return data;
}

module.exports = {
    getEvents,
};
