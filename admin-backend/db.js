const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db('portfolioDB');
    console.log('MongoDB (native driver) connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
