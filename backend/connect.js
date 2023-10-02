import { MongoClient } from "mongodb";

async function getConnection() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");

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
