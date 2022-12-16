const authRouter = require("../Routes/authRoute");
const examRouter = require("../Routes/examInfoRouter");
const questionRouter = require("../Routes/questionRouter");

const initDatabase = require('../DB/init');

function routeInit(app)
{
    initDatabase()
    .then(console.log)
    .catch(console.error);
    app.use('/',authRouter)
    app.use('/exam', examRouter)
    app.use('/question', questionRouter)
}

module.exports = routeInit;