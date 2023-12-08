import express from "express";
import { whatsapp_text_message } from "../controllers/whatsapp_controller.js";
import { whatsapp_media } from "../controllers/whatsapp_controller.js";
import { whatsapp_business_media } from "../controllers/whatsapp_controller.js";
import fs from "fs";
import multer from "multer"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });

const whatsapp_router =express.Router()
whatsapp_router.post('/whatsapp/plain_text/:phonenumber',whatsapp_text_message)
whatsapp_router.post('/whatsapp/media/:phonenumber',whatsapp_media)
whatsapp_router.post('/whatsapp/business/media/:phonenumber',upload.single('image'),whatsapp_business_media)
export{whatsapp_router}
