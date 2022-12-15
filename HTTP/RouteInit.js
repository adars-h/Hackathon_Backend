const authRouter = require("../Routes/authRoute");
const initDatabase = require('../DB/init');

function routeInit(app)
{
    initDatabase()
    .then(console.log)
    .catch(console.error);
    app.use(authRouter)
    
}

module.exports = routeInit;