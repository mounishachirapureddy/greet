import nodemailer from "nodemailer";
import {getConnection} from "./connect.js";
import path from "path";
import fs from 'fs';

async function sendBirthdayGreetings(user) {
    const client = await getConnection();
    const db = client.db("templedb");

    const qrCodesAndTempleImagesCollection = db.collection("temple_files");
    const qrCodesAndTempleImages = await qrCodesAndTempleImagesCollection.find().toArray();

    const templeDetailsCollection = db.collection("temple_details");
    const templeDetails = await templeDetailsCollection.find().toArray();
    
    const paypal = qrCodesAndTempleImages[0];
    const zelle = qrCodesAndTempleImages[1];
    const templeBanner= qrCodesAndTempleImages[2];
    const templeImage = qrCodesAndTempleImages[3];

     // Extract the 'path' property and store it in a new object
    var paypalPath = paypal.path;
    paypalPath = paypalPath.replace(/uploads/, "uploads\\");
    var zellePath = zelle.path;
    zellePath = zellePath.replace(/uploads/, "uploads\\");

    const destinationDir = './temple_files/';
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    var templeBannerPath1 = templeBanner.path;
    templeBannerPath1 = templeBannerPath1.replace(/uploads/, "uploads\\");

    var templeImagePath1 = templeImage.path;
    templeImagePath1 = templeImagePath1.replace(/uploads/, "uploads\\");

    const imagePath = 'bd.png';
    const imageDirPath = path.dirname(imagePath);
    const imageName = path.basename(imagePath);

    const facebookPath = "facebook.jpg";
    const facebookDirPath = path.dirname(facebookPath);
    const facebookName = path.basename(facebookPath);
    
    const twitterPath = "twitter.png";
    const twitterDirPath = path.dirname(twitterPath);
    const twitterName = path.basename(twitterPath);

    const instagramPath = "instagram.jpg";
    const instagramDirPath = path.dirname(instagramPath);
    const instagramName = path.basename(instagramPath);

    //Get the last row from the templeDetails array in order to get the updated details (when user uploads multiple times)
    const n = templeDetails.length - 1;

    const templateJSON = `{
      "fullName": "${user.first_name} ${user.last_name}",
      "templeBanner": "${templeBannerPath1}",
      "templeImage":"${templeImagePath1}",
      "templeDescription": "${templeDetails[n].templeDescription}",
      "address": "${templeDetails[n].address}",
      "taxId": "${templeDetails[n].taxId}",
      "phone": "${templeDetails[n].phone}",
      "fax": "${templeDetails[n].fax}",
      "websiteUrl": "${templeDetails[n].websiteUrl}",
      "facebookUrl": "${templeDetails[n].facebookUrl}",
      "twitterUrl": "${templeDetails[n].twitterUrl}",
      "instagramUrl": "${templeDetails[n].instagramUrl}",
      "paypalQrCode": "${paypalPath}",
      "zelleQrCode": "${zellePath}"
    }`
    
    const template = JSON.parse(templateJSON);

      //Send email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: 'email_address',
        pass: 'password'
      }
    });
    const mailOptions = {
      from: "email_address",
      to: user.email,
      subject: "Happy Birthday!",
      html: createEmailContent(template),

      attachments:[  
        {filename: imageDirPath, path: imageName, cid: 'birthday_wishes',  contentDisposition: 'inline',},  
        {filename: templeBanner.originalname, path: template.templeBanner, cid: 'templeBanner', contentDisposition: 'inline',},
        {filename: templeImage.originalname, path: template.templeImage, cid: 'templeImage',  contentDisposition: 'inline',},
        {filename: paypal.originalname, path: template.paypalQrCode, cid: 'paypal',  contentDisposition: 'inline',},
        {filename: zelle.originalname, path: template.zelleQrCode, cid: 'zelle',  contentDisposition: 'inline',},         
        {filename: facebookDirPath, path: facebookName, cid: 'facebook',  contentDisposition: 'inline',},
        {filename: twitterDirPath, path: twitterName, cid: 'twitter',  contentDisposition: 'inline',},
        {filename: instagramDirPath, path: instagramName, cid: 'instagram',  contentDisposition: 'inline',},
      ]
    };

    client.close();
    console.log("Connection closed");
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    function createEmailContent(template) {
      const html = `
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
                                  <img src="cid:templeBanner"/>
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
                                                <img src="cid:templeImage" alt="Hindu Community and Cultural Center" style="width: 100%; height: auto;">
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
                                            <img class="paypal" src="cid:paypal" alt="PayPal" style="width: 140px; height: 140px; margin-top: 15px; margin-bottom: 20px; margin-left: 5%;">
                                          </td>
                                          <td>
                                            <img class="zelle" src="cid:zelle" alt="Zelle" style="width: 140px; height: 140px; margin-top: 15px; margin-bottom: 20px; margin-left: 25%;">
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
                                        <b>Stay Connected:</b>&nbsp;<a href="${template.facebookUrl}"><img src="cid:facebook" alt="Facebook" style="width: 40px; height: 40px; margin-top: 10px; border-radius: 10px;"></a>&nbsp;&nbsp;
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
      
      return html;
      }
}
     
export { sendBirthdayGreetings };