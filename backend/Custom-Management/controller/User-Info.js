import { getConnection } from "../config/db.js";
import { TempleDetailsModel } from "../Model/TempleDataModel.js";
import { FileDataModel } from "../Model/FileModel.js";
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
const client=await getConnection();
const db=client.db('templedb')

async function user_Info(req,res){
    
   
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
        

        //const DataModel = mongoose.model('data', dataSchema);
        
        const newData = new TempleDetailsModel({
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
      console.log(paypalQrCode.path)

      const templeFilesDir = './temple_files/';
        if (!fs.existsSync(templeFilesDir)) {
          fs.mkdirSync(templeFilesDir);
        } 
        const paypalQrCodeDetails=new FileDataModel({
            filename:paypalQrCode.originalname,
            originalname:paypalQrCode.originalname,
            path:paypalQrCode.path,
            mimetype:paypalQrCode.mimetype,
            


        });



      // Add PayPal QR code image details to the fileDetails array
      /*const paypalQrCodeDetails = {
        filename: paypalQrCode.originalname,
        originalname: paypalQrCode.originalname,
        //path: paypalQrCode.path,
        path:paypalQrCode.path,
        mimetype: paypalQrCode.mimetype,
        
      };*/


      paypalQrCodeDetails.path='uploads\\'+paypalQrCodeDetails.originalname
       function image_data(a){
        try{
        var image=fs.readFileSync(a.path);
        return image;
        }
        catch(error){
            console.log("image reading error",error)
        }

      }
      paypalQrCodeDetails.data=image_data(paypalQrCode)
      /*var image_push=()=>{
        try{
          var image=fs.readFileSync(paypalQrCodeDetails.path)
          return image;

        }
        catch(error){
          console.log("error got")
          return error;
        }*/

      
      //paypalQrCodeDetails.data=image_push();
      //await db.collection('temple_files').insertOne(paypalQrCodeDetails)
      templeFiles.push(paypalQrCodeDetails);
      //upload.push(paypalQrCodeDetails)

      //const paypalQrCodeFilePath = './temple_files/' + (paypalQrCode.originalname);  
      const paypalQrCodeFilePath = './uploads/' + (paypalQrCodeDetails.originalname)    
      fs.renameSync(paypalQrCode.path, paypalQrCodeFilePath);

      // Add Zelle QR code image details to the fileDetails array
      
      const zelleQrCodeDetails = new FileDataModel({
        filename: zelleQrCode.filename,
        originalname: zelleQrCode.originalname,
        path: zelleQrCode.path,
        mimetype: zelleQrCode.mimetype,
      });
      zelleQrCodeDetails.path='uploads\\'+zelleQrCodeDetails.originalname
      zelleQrCodeDetails.data=image_data(zelleQrCode)
      //await db.collection('temple_files').insertOne(zelleQrCodeDetails)
      templeFiles.push(zelleQrCodeDetails);
      //zelleQrCodeDetails.path='uploads\\'+zelleQrCodeDetails.originalname
      //upload.push(zelleQrCodeDetails)

      //const zelleQrCodeFilePath = './temple_files/' + (zelleQrCode.originalname); 
      const zelleQrCodeFilePath = './uploads/' + (zelleQrCodeDetails.originalname)     
      fs.renameSync(zelleQrCode.path, zelleQrCodeFilePath);
      
      const templeBannerDetails = new FileDataModel({
        filename: templeBanner.filename,
        originalname: templeBanner.originalname,
        path: templeBanner.path,
        mimetype: templeBanner.mimetype,
      });
      templeBannerDetails.path='uploads\\'+templeBannerDetails.originalname
      templeBannerDetails.data=image_data(templeBanner);
      //await db.collection('temple_files').insertOne(templeBannerDetails)
      templeFiles.push(templeBannerDetails);
      //templeBannerDetails.path='uploads\\'+templeBannerDetails.originalname
      //upload.push(templeBannerDetails)

      const templeBannerFilePath = './uploads/' + (templeBannerDetails.originalname);      
      fs.renameSync(templeBanner.path, templeBannerFilePath);

      const templeImageDetails = new FileDataModel({
        filename: templeImage.filename,
        originalname: templeImage.originalname,
        path: templeImage.path,
        mimetype: templeImage.mimetype,
      });
      templeImageDetails.path='uploads\\'+templeImageDetails.originalname
      templeImageDetails.data=image_data(templeImage)
      //await db.collection('temple_files').insertOne(templeImageDetails)
      templeFiles.push(templeImageDetails);
      //templeImageDetails.path='uploads\\'+templeImageDetails.originalname
      console.log(templeImage.path)

      const templeImageFilePath = './uploads/' + (templeImageDetails.originalname);      
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
        
          const deityImageDetails = new FileDataModel({
            filename: deityImage.filename,
            originalname: deityImage.originalname,
            path: deityImage.path,
            mimetype: deityImage.mimetype,
          });
          deityImageDetails.data=image_data(deityImageDetails)
          imageAndAudioDetails.push(deityImageDetails);
          const deityImageFilePath = './images_and_audio(editing_purpose)/' + (deityImage.originalname);      
          fs.renameSync(deityImage.path, deityImageFilePath);

          const priestImageDetails = new FileDataModel({
            filename: priestImage.filename,
            originalname: priestImage.originalname,
            path: priestImage.path,
            mimetype: priestImage.mimetype,
          });
          priestImageDetails.data=image_data(priestImageDetails)
          imageAndAudioDetails.push(priestImageDetails);
          const priestImageFilePath = './images_and_audio(editing_purpose)/' + (priestImage.originalname);      
          fs.renameSync(priestImage.path, priestImageFilePath);

          const audioFileDetails = {
            filename: audioFile.filename,
            originalname: audioFile.originalname,
            path: audioFile.path,
            mimetype: audioFile.mimetype,
          };
          audioFileDetails.data=image_data(audioFileDetails)
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
                const birthdateParts = user.birthdate.split('-'); // Assuming the format is "MM/DD/YYYY"
            const year=parseInt(birthdateParts[2]);
            var day_=parseInt(birthdateParts[0])
            var month_=parseInt(birthdateParts[1])-1
            console.log(year,month_,day_)
            //console.log(birthdateParts)
            const birthdate = new Date(Date.UTC(year,month_,day_));
            const Birthdate=birthdate.toLocaleDateString("en-IN")
            console.log("this is Birthday",Birthdate)
            /*const birthdateParts = user.birthdate.split('/'); // Assuming the format is "MM/DD/YYYY"
            const BirthdateParts=['19','10','2023']
            const birthdate = new Date(BirthdateParts[2], BirthdateParts[0] - 1, BirthdateParts[1]);*/

                return {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                contact: user.contact,
                birthdate: Birthdate,
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


}
export {user_Info}