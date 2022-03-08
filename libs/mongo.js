const url = require('url');
const mongodb = require('mongodb');
const { ObjectId } = require('mongodb');
const mongoClient = mongodb.MongoClient;

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await mongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db(url.parse(uri).pathname.substr(1));

  cachedDb = db;
  return db;
}
module.exports = {
  connectToDatabase,
  castToObjectId: ObjectId,
  isValidObjectId: ObjectId.isValid,
};
