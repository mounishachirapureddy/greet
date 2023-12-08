import express,{json} from 'express'
import { user_Info } from '../controller/User-Info.js';
import multer from 'multer';
import fs from 'fs';
const uploadsDir = './uploads/';
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir);
        }
const upload=multer({dest:'uploads'});


//const express = require("express");
//const { getMerchandises, getImage , getHome } = require("../controllers/merchandiseController.js");
const UserInfo = express.Router();

UserInfo.post('/temple-details',upload.fields([
    { name: 'csvFile', maxCount: 1 },
    { name: 'paypalQrCode', maxCount: 1 },
    { name: 'zelleQrCode', maxCount: 1 },
    { name: 'deityImage', maxCount: 1},
    { name: 'priestImage', maxCount: 1},
    { name: 'audioFile', maxCount: 1},      
    { name: 'templeBanner', maxCount: 1 },
    { name: 'templeImage', maxCount: 1 },
    { name: 'address', maxCount: 1 },
    { name: 'taxId', maxCount: 1 },
    { name: 'phone', maxCount: 1 },
    { name: 'fax', maxCount: 1 },
    { name: 'templeDescription', maxCount: 1 },
    
    { name: 'websiteUrl', maxCount: 1 },
    { name: 'facebookUrl', maxCount: 1 },
    { name: 'twitterUrl', maxCount: 1 },
    { name: 'instagramUrl', maxCount: 1 },
    
  ]),user_Info)
export { UserInfo};
