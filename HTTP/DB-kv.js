const mongoose = require('mongoose');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://adarsh:KPD09EyQF5kqTvVD@cluster0.dbuwwtz.mongodb.net/?retryWrites=true&w=majority';

async function main() {
  await mongoose.connect(url);
  console.log('Connected successfully to server');
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)

db = client.db(dbName);