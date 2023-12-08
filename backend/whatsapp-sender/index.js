//import { getConnection } from './connect.js';
import express, { json } from 'express';
import multer from 'multer';
import { getConnection } from './config/db.js';
import fs from 'fs';

import { whatsapp_router } from './Routes/Whatsapp_web.js';
/*import csv from 'csv-parser';
import mongoose from 'mongoose';
import { MongoClient } from "mongodb";
import path from 'path';*/
//import { retrieveUsersWithBirthday } from './user-service.js';
//import cron from "node-cron"


const app = express();
app.use(express.json());


/*const uploadsDir = './uploads/';
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir);
        }
        */

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
const PORT = 3010;
app.listen(PORT, () => {
  getConnection();
  console.log(`Server running on port ${PORT}`);
});
app.use('/api',whatsapp_router);
//app.use('/api',VideoInfo)


  