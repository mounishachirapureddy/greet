import express, { json } from 'express';
//import multer from 'multer';
import { getConnection } from './config/db.js';
import fs from 'fs';
//import { UserInfo } from './Routes/UserInfo.js'
//import { VideoInfo } from './Routes/VideoInfo.js';
import { Retrive } from './Route/RetriveBirthdayRouter.js';
/*import csv from 'csv-parser';
import mongoose from 'mongoose';
import { MongoClient } from "mongodb";
import path from 'path';*/
//import { retrieveUsersWithBirthday } from './user-service.js';
//import cron from "node-cron"


const app = express();
app.use(express.json());



//const upload = multer({ dest: 'uploads/' });
//const upload1 = multer({dest: 'temple_files1/'});

try{
    const client=await  getConnection();
    const db=client.db('templedb');
    console.log("Connected to Data base setup")

}
catch(error){
    console.log("connection failed",error)
}
const PORT = 3007;
app.listen(PORT, () => {
  getConnection();
  console.log(`Server running on port ${PORT}`);
});
app.use('/api',Retrive);