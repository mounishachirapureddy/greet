import express from 'express';
import twilio from 'twilio';
import dotenv from "dotenv"
import { getConnection } from '../config/db.js';
import datauri from "datauri"
dotenv.config();
import fs from "fs"
import multer from 'multer';


const app = express();
const port = 3000;

// Your Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_ID;
const authToken = process.env.AUTH_TOKEN;

// Create a Twilio client
const client = twilio(accountSid, authToken);
async function whatsapp_text_message(req,res){

// Endpoint to send a WhatsApp message

  try {
    // Replace 'to' and 'from' with actual phone numbers
    const message = await client.messages.create({
      from: 'whatsapp:+14155238886',  // Your Twilio WhatsApp number
      to: `whatsapp:+91${req.body.phonenumber}`,  // Recipient's WhatsApp number
      body: req.body.info
    });

    console.log('WhatsApp message sent:', message.sid);
    res.send('WhatsApp message sent!');
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    res.status(500).send('Error sending WhatsApp message');
  }



}
async function whatsapp_media(req,res){

    try {
        const client_user=getConnection();
        const temple_file_collection=client_user.collection('temple_files').find().toArray()
        const templeDetails=client_user.collection('temple_details').find().toArray()
        const templateJSON = `{
            "fullName": "${req.firstname} ${req.lastname}",
            
            
            "templeDescription": "${templeDetails[n].templeDescription}",
            "address": "${templeDetails[0].address}",
            "taxId": "${templeDetails[0].taxId}",
            "phone": "${templeDetails[0].phone}",
            "fax": "${templeDetails[0].fax}",
            "websiteUrl": "${templeDetails[0].websiteUrl}",
            "facebookUrl": "${templeDetails[0].facebookUrl}",
            "twitterUrl": "${templeDetails[0].twitterUrl}",
            "instagramUrl": "${templeDetails[0].instagramUrl}"
           
          }`
          const template=JSON.parse(templateJSON)
          
        
        var temple_banner_base64=Buffer.from(temple_file_collection[0].data)
        var temple_image_base64=Buffer.from(temple_file_collection[1].data)
        var paypal_qrcode_base64=Buffer.from(temple_file_collection[2].data)
        var zelle_qrcode_base64=Buffer.from(temple_file_collection[3].data)
        var temple_banner_uri=new datauri().format('jpg',temple_banner_base64)
        var temple_image_uri=new datauri().format('jpg',temple_image_base64)
        var paypal_qrcode_uri=new datauri().format('jpg',paypal_qrcode_base64)
        var zelle_qrcode_uri=new datauri().format('jpg',zelle_qrcode_base64)
        const htmlcontent=`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Happy Birthday</title>
        </head>
        <table width="100%" border="0" cellpadding="0" cellspacing="0" >
          <tr>
              <td valign="top">
                  <body>
                  <div> 
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>                
                                <td align="center">
                                    <img src="${temple_banner_uri}"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="margin: 10px 0px; text-align: center">
                    <table>
                      <tbody><tr><td>
                          <div style="text-align: left; margin-left: 180px">
                              <p><b class="namaste-text" style="color: #5a0901; font-size: 20px;">Namaste <span style="text-transform: uppercase;">${template.fullName}</span></b></p>
                          </div>
                      </td></tr></tbody>
                    </table>          
                    <table border="0" cellspacing="0" cellpadding="0" width="800" align="center" style="text-align: left; background-color:#ffaf4d; border-bottom: #5a0901 5px solid; border-left: #5a0901 5px solid; line-height: 20px; font-family: Verdana, Geneva, sans-serif; color: #000000; font-size: 13px; border-top: #5a0901 5px solid; border-right: #5a0901 5px solid;">
                        <tbody>
                            <tr>
                                <td valign="top" >
                                    <div align="center">
                                        <table border="0" cellspacing="0" cellpadding="0" width="800" align="center">
                                          <tr>
                                            <td>
                                              <div style="float: left; width: 40%; margin-top: 10px; margin-left: 10px;">
                                                <div style="width: 440px; overflow: hidden; border-radius: 30% 30% 0% 0%;">
                                                  <img src="${temple_image_uri}" alt="Hindu Community and Cultural Center" style="width: 100%; height: auto;">
                                                </div>
                                              </div>
                                            </td>
                                            <td>
                                              <div style="float: right; width: 80%; margin-right: 20px;">
                                                <description>
                                                  <p style="font-style: normal; font-size: 15 px; text-align: justify; font-family: 'Georgia', serif;">${template.templeDescription}</p>
                                                </description>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>              
                                      <div style="text-align: center; background-color: #ed6f0e; padding: 18px; border-radius: 8px; margin: 10px 10px 10px 10px;">
                                        <p style="font-size: 25px; font-weight: bold; color: #ffffff; font-family: 'Georgia', serif, cursive; margin: 0;">Happy Birthday</p>
                                      </div>              
                                      <table cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td>
                                          <div style="margin-top: 1px; margin-right: 10px; margin-left: 10px; position: relative; display: inline-block;">                                          
                                            <a href="http://localhost:3000/video-page" style="position: relative;"><img src="cid:birthday_wishes" alt="Birthday Wishes" style="max-width: 100%; height: auto; border-radius: 10px 10px 10px 10px;"></a>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>                                  
                                      <div style="text-align: center;">
                                        <p style="font-family: 'Georgia', serif; text-align: center; align-items: center; font-size: 18px; margin: 0; margin-top: 15px;">Our mission is to make our community a better place. Your support is essential to achieving this goal. Please consider donating today.</p>
                                        <table cellspacing="0" cellpadding="0" style="margin: 2% auto;">
                                          <tr>
                                            <td>
                                              <img class="paypal" src="${paypal_qrcode_uri}" alt="PayPal" style="width: 140px; height: 140px; margin-top: 15px; margin-bottom: 20px; margin-left: 5%;">
                                            </td>
                                            <td>
                                              <img class="zelle" src="${zelle_qrcode_uri}" alt="Zelle" style="width: 140px; height: 140px; margin-top: 15px; margin-bottom: 20px; margin-left: 25%;">
                                            </td>
                                          </tr>
                                        </table>
                                      </div>                                
                                      <div style="color: black; text-align: center; margin: 10px auto; justify-content: space-between; font-size: 18px; font-family:'Georgia', serif;">
                                        <p>For further details and the latest information:</p>
                                        <p>Please visit the temple website <b>${template.websiteUrl}</b></p>
                                      </div>
                                      <footer style="padding: 10px; margin-top: 20px; justify-content: space-between;">
                                        <div style="text-align: left; font-family: 'Georgia', serif; font-size: 18px; flex: 1; color: #000; margin: 5px 0; display: inline-column;">
                                          <b>ADDRESS AND OTHER INFORMATION</b><br><br>
                                          ${template.address}<br>   
                                          Tax ID # ${template.taxId}<br>
                                          Phone: ${template.phone}; Fax: ${template.fax}<br>
                                          ${template.websiteUrl}<br>
                                        </div>
                                        <div style="margin-right: 20px;">
                                          <b>Stay Connected:</b>&nbsp;<a href="${template.facebookUrl}"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAEklEQVR42mP8/wcAAwAB/8AAP+AAEAAAAHAAAAAB/5eDAAAAAAElFTkSuQmCC" alt="Facebook" style="width: 40px; height: 40px; margin-top: 10px; border-radius: 10px;"></a>&nbsp;&nbsp;
                                          <a href="${template.twitterUrl}"><img src="cid:twitter" alt="Twitter" style="width: 40px; height: 40px; margin-top: 10px; border-radius: 10px;"></a>&nbsp;&nbsp;
                                          <a href="${template.instagramUrl}"><img src="cid:instagram" alt="Instagram" style="width: 40px; height: 40px; margin-top: 10px; border-radius: 10px;"></a>
                                        </div>
                                      </footer>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
                </body>
              </td>
          </tr>
        </table>
        </html>`
        
        // Replace 'to' and 'from' with actual phone numbers
        const message = await client.messages.create({
          from: 'whatsapp:+14155238886',  // Your Twilio WhatsApp number
          to: `whatsapp:+91${req.params.phonenumber}`,  // Recipient's WhatsApp number
          body: htmlcontent,
          mediaUrl:[temple_banner_uri.content,temple_image_uri,paypal_qrcode_uri,zelle_qrcode_uri],
        });
    
        console.log('WhatsApp message sent:', message.sid);
        res.send('WhatsApp message sent!');
      } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        res.status(500).send('Error sending WhatsApp message');
      }
    
    
}

async function whatsapp_business_media(req,res){
    try {
        const imagePath = req.file.path;

        // Read the image file and convert to base64
        const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
        //const datauri_image=data:image/jpeg;base64,${imageBase64}
        
         
          
        
        
        const htmlcontent=`<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>JioAirFibre</title>
        </head>
        
        <body>
        
            <!-- Image Section -->
            <div style="text-align: center;">
                <img src="data:image/jpeg;base64,${imageBase64}" alt="Product Image" style="max-width: 100%; height: auto;">
            </div>
        
            <!-- Product Information Section -->
            <div style="padding: 20px; text-align: center;">
                <h2>Product Name</h2>
                <p>Introducing JioAirFiber! Indias latest Home entertainment and Wi-Fi service with best-in-class value proposition     

                Digital Entertainment
                • Leading 550+ digital TV channels 
                • Catch-up TV to watch missed episodes, events and more. 
                • Popular 16+ OTT app subscriptions 
                
                Broadband Connection
                • Wi-Fi connectivity and high-speed internet 
                • Strong signal everywhere in your home 
                
                Home devices at no extra cost
                • Latest Wi-Fi 6 router, 4k Smart Set-Top-Box & Voice-active remote 
                *T&C Apply
                </p>
                <p>
                    Huury up and set up our jio fibre into your home!!
                </p>
            </div>
        
            <!-- Button to Navigate to the Website -->
            <div style="text-align: center;">
                <a href="https://google.com" target="BookNow" style="padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;">Visit Website</a>
            </div>
        
        </body>
        
        </html>
        
        `
        
        // Replace 'to' and 'from' with actual phone numbers
        const message = await client.messages.create({
          from: 'whatsapp:+14155238886',  // Your Twilio WhatsApp number
          to: `whatsapp:+91${req.params.phonenumber}`,  // Recipient's WhatsApp number
          body: htmlcontent,
          mediaUrl:["data:image/jpeg;base64,"+imageBase64],
        });
    
        console.log('WhatsApp message sent:', message.sid);
        res.send('WhatsApp message sent!');
      } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        res.status(500).send('Error sending WhatsApp message');
      }
    

}
export {whatsapp_text_message,whatsapp_media,whatsapp_business_media}
