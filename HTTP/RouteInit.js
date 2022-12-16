const authRouter = require("../Routes/authRoute");
const examRouter = require("../Routes/examInfoRouter");
const questionRouter = require("../Routes/questionRouter");

const eventRouter = require("../Routes/eventsRoute.js");
const initDatabase = require('../DB/init');

function routeInit(app)
{
    initDatabase()
    .then(console.log)
    .catch(console.error);
    app.use('/',authRouter)
    app.use('/exam', examRouter)
    app.use('/question', questionRouter)app.use('/events',eventRouter);
}

module.exports = routeInit;