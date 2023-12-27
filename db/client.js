const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://user:user@learning-mongo.ir16akw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const db = client.db('learning-mongo');

module.exports = {
    client,
    db,
};