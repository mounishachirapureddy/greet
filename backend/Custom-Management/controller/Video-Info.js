import { getConnection } from "../config/db.js";
//import { TempleDetailsModel } from "../Model/TempleDataModel.js";
import { FileDataModel } from "../Model/FileModel.js";
//import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
const client=await getConnection();
const db=client.db('templedb')
async function Video_Info(req,res){
    const uploadedVideoFile = req.files.videoFile[0];
        uploadedVideoFile.originalname = 'Greetings.mp4';
        const destinationDir = './greetings_video/';
        if (!fs.existsSync(destinationDir)) {
          fs.mkdirSync(destinationDir);
        }
        const uploadedVideoFileDetails = new FileDataModel({
            filename: uploadedVideoFile.filename,
            originalname: uploadedVideoFile.originalname,
            path: uploadedVideoFile.path,
            mimetype: uploadedVideoFile.mimetype,
          });
          function video_store(){
            try{
                var video= fs.readFileSync(uploadedVideoFile.path)
                return  video
            }
            catch(error){
                console.log("can't read video",error)
            }
          }
          uploadedVideoFileDetails.data=video_store();
        const videoFilePath = './greetings_video/' + (uploadedVideoFile.originalname); // Path to the folder where you want to store the video file       
        console.log(videoFilePath);
        // Move the uploaded video file to the specified folder
        fs.renameSync(uploadedVideoFile.path, videoFilePath);

        

        const videoCollection = db.collection('greetings_video');
        const result = videoCollection.insertOne(uploadedVideoFileDetails);
        res.json({ message: 'File uploaded successfully' });
    



}
export{Video_Info}
async function get_video(req,res){
    const video_data=await db.collection('greetings_video').findOne()
    //console.log(video_data)
    const dta=video_data.data.buffer
    res.setHeader('Content-Type', 'video/mp4');
    
    res.send(dta)

}
export{get_video}
