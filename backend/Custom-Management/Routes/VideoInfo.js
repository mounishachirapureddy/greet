import express,{json} from 'express'
//import { user_Info } from '../controller/User-Info.js';
import multer from 'multer';
import fs from 'fs';
import { Video_Info } from '../controller/Video-Info.js';
import { get_video } from '../controller/Video-Info.js';
const upload=multer({dest:'uploads'});



//const express = require("express");
//const { getMerchandises, getImage , getHome } = require("../controllers/merchandiseController.js");
const VideoInfo = express.Router();

VideoInfo.post('/editor-form',upload.fields([
    
    { name: 'videoFile', maxCount: 1 },
    
  ]),Video_Info)
VideoInfo.get('/getVideo',get_video)
export { VideoInfo};
