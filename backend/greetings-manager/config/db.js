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
