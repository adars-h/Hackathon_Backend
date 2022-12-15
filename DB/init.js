const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb+srv://adarsh:KPD09EyQF5kqTvVD@cluster0.dbuwwtz.mongodb.net/?retryWrites=true&w=majority';


async function initDatabase() {
  mongoose.set('strictQuery', false);
  await mongoose.connect(url);
  console.log('Connected successfully to server');
  return 'done.';
}

module.exports = initDatabase;
