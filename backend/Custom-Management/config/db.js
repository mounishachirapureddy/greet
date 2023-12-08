import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
 
const mongo_url = process.env.MONGO_URL;
async function getConnection() {
  const client = new MongoClient(mongo_url);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error(error);
    throw error;
  } 
}
export { getConnection };
/*import { MongoClient } from "mongodb";

// Retrieve MongoDB connection string from environment variable
const mongoURI = process.env.MONGO_URI;

async function getConnection() {
  if (!mongoURI) {
    throw new Error("MongoDB connection string not provided in the environment variable MONGO_URI");
  }

  const client = new MongoClient(mongoURI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getConnection };*/

