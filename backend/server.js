import { getConnection } from './connect.js';
import express, { json } from 'express';
import multer from 'multer';
import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { MongoClient } from "mongodb";
import path from 'path';


const app = express();
app.use(json());

const uploadsDir = './uploads/';
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir);
        }

const upload = multer({ dest: 'uploads/' });
//const upload1 = multer({dest: 'temple_files1/'});

const dataSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  taxId: {
    type: String,
  },
  phone: {
    type: String,
  },
  fax: {
    type: String,
  },
  templeDescription: {
    type: String,
  },
  websiteUrl: {
    type: String,
    required: true,
  },
  facebookUrl: {
    type: String,
  },
  twitterUrl: {
    type: String,
  },
  instagramUrl: {
    type: String,
  },
});

async function startServer() {
  try {
    const client = await getConnection();
    const db = client.db('templedb');
    console.log("Server started");

    app.post('/api/temple-details', upload.fields([
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
    ]), async (req, res) => {      
        //Access the uploaded files through req.files

        try {
          // List all collections in the database
          const collections = await db.listCollections().toArray();
          
          // Drop each collection
          for (const collection of collections) {
            await db.collection(collection.name).drop();
          }
        } catch (err) {
          console.error('Error dropping collections:', err);
        }

        const uploadedCsvFile = req.files.csvFile[0];
        const paypalQrCode = req.files.paypalQrCode[0];
        const zelleQrCode = req.files.zelleQrCode[0];
        const deityImage = req.files.deityImage[0];
        const priestImage = req.files.priestImage[0];
        const audioFile = req.files.audioFile[0];
        const templeBanner = req.files.templeBanner[0];
        const templeImage = req.files.templeImage[0];

        const address = req.body.address;
        const taxId = req.body.taxId;
        const phone = req.body.phone;
        const fax = req.body.fax;
        const templeDescription = req.body.templeDescription;
        const websiteUrl = req.body.websiteUrl;
        const facebookUrl = req.body.facebookUrl;
        const twitterUrl = req.body.twitterUrl;
        const instagramUrl = req.body.instagramUrl;

        const DataModel = mongoose.model('data', dataSchema);
        
        const newData = new DataModel({
          address,
          taxId,
          phone,
          fax,
          templeDescription,
          websiteUrl,
          facebookUrl,
          twitterUrl,
          instagramUrl,
        });

        // Print the information present in the newData object
        //console.log('Data to be saved:', newData);

        // Create the 'files' collection and insert newData
        const result = await db.collection('temple_details').insertOne(newData);          
        
       // Create an array to store the file details
      const templeFiles = [];

      const templeFilesDir = './temple_files/';
        if (!fs.existsSync(templeFilesDir)) {
          fs.mkdirSync(templeFilesDir);
        } 

      // Add PayPal QR code image details to the fileDetails array
      const paypalQrCodeDetails = {
        filename: paypalQrCode.filename,
        originalname: paypalQrCode.originalname,
        path: paypalQrCode.path,
        mimetype: paypalQrCode.mimetype,
      };
      templeFiles.push(paypalQrCodeDetails);

      const paypalQrCodeFilePath = './temple_files/' + (paypalQrCode.originalname);      
      fs.renameSync(paypalQrCode.path, paypalQrCodeFilePath);

      // Add Zelle QR code image details to the fileDetails array
      const zelleQrCodeDetails = {
        filename: zelleQrCode.filename,
        originalname: zelleQrCode.originalname,
        path: zelleQrCode.path,
        mimetype: zelleQrCode.mimetype,
      };
      templeFiles.push(zelleQrCodeDetails);

      const zelleQrCodeFilePath = './temple_files/' + (zelleQrCode.originalname);      
      fs.renameSync(zelleQrCode.path, zelleQrCodeFilePath);
      
      const templeBannerDetails = {
        filename: templeBanner.filename,
        originalname: templeBanner.originalname,
        path: templeBanner.path,
        mimetype: templeBanner.mimetype,
      };
      templeFiles.push(templeBannerDetails);

      const templeBannerFilePath = './temple_files/' + (templeBanner.originalname);      
      fs.renameSync(templeBanner.path, templeBannerFilePath);

      const templeImageDetails = {
        filename: templeImage.filename,
        originalname: templeImage.originalname,
        path: templeImage.path,
        mimetype: templeImage.mimetype,
      };
      templeFiles.push(templeImageDetails);

      const templeImageFilePath = './temple_files/' + (templeImage.originalname);      
      fs.renameSync(templeImage.path, templeImageFilePath);

      // Create a new collection for storing file details
      // Insert the QR code image details into the 'files' collection

      const fileCollection = db.collection('temple_files');
      await fileCollection.insertMany([...templeFiles]);
      console.log("Files uploaded");      

        const imageAndAudioDetails = [];

        const destinationDir = './images_and_audio(editing_purpose)/';
        if (!fs.existsSync(destinationDir)) {
          fs.mkdirSync(destinationDir);
        }        
        
          const deityImageDetails = {
            filename: deityImage.filename,
            originalname: deityImage.originalname,
            path: deityImage.path,
            mimetype: deityImage.mimetype,
          };
          imageAndAudioDetails.push(deityImageDetails);
          const deityImageFilePath = './images_and_audio(editing_purpose)/' + (deityImage.originalname);      
          fs.renameSync(deityImage.path, deityImageFilePath);

          const priestImageDetails = {
            filename: priestImage.filename,
            originalname: priestImage.originalname,
            path: priestImage.path,
            mimetype: priestImage.mimetype,
          };
          imageAndAudioDetails.push(priestImageDetails);
          const priestImageFilePath = './images_and_audio(editing_purpose)/' + (priestImage.originalname);      
          fs.renameSync(priestImage.path, priestImageFilePath);

          const audioFileDetails = {
            filename: audioFile.filename,
            originalname: audioFile.originalname,
            path: audioFile.path,
            mimetype: audioFile.mimetype,
          };
          imageAndAudioDetails.push(audioFileDetails);
          const audioFilePath = './images_and_audio(editing_purpose)/' + (audioFile.originalname);      
          fs.renameSync(audioFile.path, audioFilePath);
          
          // Create a new collection for storing file details
          const fileCollection1 = db.collection('image_audio_files');

          // Insert the file details into the 'files' collection
          await fileCollection1.insertMany([...imageAndAudioDetails]);
          console.log('Images and Audio Files uploaded');
        
          // Process the uploaded CSV file
          const results = [];
          fs.createReadStream(uploadedCsvFile.path)
             .pipe(csv({ headers: ['first_name', 'last_name', 'email', 'contact', 'birthdate'] }))
            .on('data', (data) => results.push(data))
            .on('end', async () => {     
             
                // Remove the first row from the `results` array
              const deletedRow = results.shift();
              console.log('Parsed CSV data:', results);
    
              // Create the 'u_details' collection
              const collection = db.collection('user_details');                       
    
            // Process the uploaded CSV file and assign field names to the data
            const processedData = results.map((user) => {
                // Parse the birthdate string to a JavaScript Date object
            const birthdateParts = user.birthdate.split('/'); // Assuming the format is "MM/DD/YYYY"
            const birthdate = new Date(birthdateParts[2], birthdateParts[0] - 1, birthdateParts[1]);

                return {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                contact: user.contact,
                birthdate: birthdate,
                };
            });

            // Check for duplicates by email
            const existingEmails = await collection.distinct('email');
            const newData = processedData.filter((user) => !existingEmails.includes(user.email));

            if (newData.length === 0) {
              console.log('No new data to insert. All records already exist.');
              return res.json({ message: 'No new data to insert. All records already exist.' });
            }
                
            // Inside the .connect() callback, insert the processedData into the 'u_details' collection
            collection.insertMany(processedData, (err, result) => {
                if (err) {
                console.error('Error inserting data into collection:', err);
                return;
                }
                console.log('Data inserted successfully!');
            });  
        
              res.json({ message: 'CSV File uploaded successfully' });
            })
            .on('error', (error) => {
              console.error('Error parsing CSV file:', error);
              res.status(500).json({ error: 'Error parsing CSV file' });
            });
      });
    
      app.post('/api/editor-form', upload.fields([
        { name: 'videoFile', maxCount: 1 },
      ]), async (req, res) =>{
        const uploadedVideoFile = req.files.videoFile[0];
        uploadedVideoFile.originalname = 'Greetings.mp4';
        const destinationDir = './greetings_video/';
        if (!fs.existsSync(destinationDir)) {
          fs.mkdirSync(destinationDir);
        }
        const videoFilePath = './greetings_video/' + (uploadedVideoFile.originalname); // Path to the folder where you want to store the video file       
        console.log(videoFilePath);
        // Move the uploaded video file to the specified folder
        fs.renameSync(uploadedVideoFile.path, videoFilePath);

        const uploadedVideoFileDetails = {
          filename: uploadedVideoFile.filename,
          originalname: uploadedVideoFile.originalname,
          path: uploadedVideoFile.path,
          mimetype: uploadedVideoFile.mimetype,
        };

        const videoCollection = db.collection('greetings_video');
        const result = videoCollection.insertOne(uploadedVideoFileDetails);
        res.json({ message: 'File uploaded successfully' });
    })

        app.get('/api/getVideo', (req, res) => {
          const videoPath = path.join('C:/Users/Goutham/Desktop/Project/GreetingService/backend', 'greetings_video', 'Greetings.mp4'); // Adjust the video filename as needed
          res.sendFile(videoPath);
        });

        const PORT = 3001;
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      }
}
startServer();
