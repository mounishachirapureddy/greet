  import React, { useState, useEffect } from "react";
  import UserForm from './UserForm.css';
  import { useRef } from 'react';


  function UserDetails() {
    const formRef = useRef(null);   
    const [csvFile, setCsvFile] = useState(null);
    const [paypalQrCode, setPaypalQrCode] = useState(null);
    const [zelleQrCode, setZelleQrCode] = useState(null);
    const [deityImage, setDeityImage] = useState([]);
    const [priestImage, setPriestImage] = useState([]);
    const [audioFile, setAudioFile] = useState([]);
    const [templeBanner, setTempleBanner] = useState(null);
    const [templeImage, setTempleImage] = useState(null);
    const [address, setAddress] = useState("");
    const [taxId, setTaxId] = useState("");
    const [phone, setPhone] = useState("");
    const [fax, setFax] = useState("");
    const [templeDescription, setTempleDescription] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [facebookUrl, setFacebookUrl] = useState("");
    const [twitterUrl, setTwitterUrl] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");

      const handleCsvFileChange = (e) => {
        setCsvFile(e.target.files[0]);
      };

      const handlePaypalQrCodeChange = (e) => {
        setPaypalQrCode(e.target.files[0]);
      };

      const handleZelleQrCodeChange = (e) => {
        setZelleQrCode(e.target.files[0]);
      };

      const handleDeityImageFileChange = (e) => {
        setDeityImage(e.target.files[0]);
      };
      const handlePriestImageFileChange = (e) => {
        setPriestImage(e.target.files[0]);
      };    
      const handleAudioFileChange = (e) => {      
        setAudioFile(e.target.files[0]);
      };

      // Handle the change for Temple Banner image input field
      const handleTempleBannerChange = (e) => {
        setTempleBanner(e.target.files[0]);
      };

      // Handle the change for Temple Image input field
      const handleTempleImageChange = (e) => {
        setTempleImage(e.target.files[0]);
      };

      // Handle the change for Address input field
      const handleAddressChange = (e) => {
        setAddress(e.target.value);
      };

      // Handle the change for Tax ID input field
      const handleTaxIdChange = (e) => {
        setTaxId(e.target.value);
      };

      // Handle the change for Phone input field
      const handlePhoneChange = (e) => {
        setPhone(e.target.value);
      };

      // Handle the change for Phone input field
      const handleFaxChange = (e) => {
        setFax(e.target.value);
      };

      // Handle the change for Phone input field
      const handleTempleDescriptionChange = (e) => {
        setTempleDescription(e.target.value);
      };

      // Handle the change for Website URL input field
      const handleWebsiteUrlChange = (e) => {
        setWebsiteUrl(e.target.value);
      };

      // Handle the change for Facebook URL input field
      const handleFacebookUrlChange = (e) => {
        setFacebookUrl(e.target.value);
      };

      // Handle the change for Twitter URL input field
      const handleTwitterUrlChange = (e) => {
        setTwitterUrl(e.target.value);
      };

      // Handle the change for Instagram URL input field
      const handleInstagramUrlChange = (e) => {
        setInstagramUrl(e.target.value);
      };

      const handleSubmit = (e) => {
      console.log("handle submit");
      e.preventDefault();

      const formData = new FormData();

      formData.append("csvFile", csvFile);
      formData.append("paypalQrCode", paypalQrCode);
      formData.append("zelleQrCode", zelleQrCode);
      formData.append("templeBanner", templeBanner);
      formData.append("templeImage", templeImage);
      formData.append("deityImage", deityImage);
      formData.append("priestImage", priestImage);
      formData.append("audioFile", audioFile);
      formData.append("address", address);
      formData.append("taxId", taxId);
      formData.append("phone", phone);
      formData.append("fax", fax);
      formData.append("templeDescription", templeDescription);
      formData.append("websiteUrl", websiteUrl);
      formData.append("facebookUrl", facebookUrl);
      formData.append("twitterUrl", twitterUrl);
      formData.append("instagramUrl", instagramUrl);

      fetch("http://localhost:3009/api/temple-details", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the backend if needed
          console.log(data);
        })
        .catch((error) => {
          // Handle any errors that occur during the upload process
         // console.error({"Error": error})
         console.error(error)
        });     
        // Clear the form fields by setting their values to an empty string
        setCsvFile(null);
        setPaypalQrCode(null);
        setZelleQrCode(null);
        setTempleBanner(null);
        setTempleImage(null);
        setDeityImage([]);
        setPriestImage([]);
        setAudioFile(null);
        setAddress("");
        setTaxId("");
        setPhone("");
        setFax("");
        setTempleDescription("");
        setWebsiteUrl("");
        setFacebookUrl("");
        setTwitterUrl("");
        setInstagramUrl("");

        alert("Form Submitted Successfully!");   
    };

    return (
      <div>            
        <form ref={formRef} class="form-wrapper" onSubmit={handleSubmit}>
          <h1 class="greeting-heading">Greetings Messenger Service</h1>
          <div class="form-container" >
            {/* <!-- Grouped Box for Left and Middle Sections --> */}
            <div class="group-box left-middle-box">
              <h2><center>Temple Information</center></h2>
              {/* <!-- Left Section --> */}
              <div class="left-section">
                <div className="file-input-group">
                  <label>Temple Banner <span aria-required="true" style={UserForm.required}>*</span></label>
                  <input
                    name="templeBanner"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => handleTempleBannerChange(e, 0)}
                  required
                  />
                </div>
                <div className="file-input-group">
                  <label>Temple Image</label>
                  <input
                    name="templeImage"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => handleTempleImageChange(e, 0)}
                  required
                  />
                </div>
                <div className="file-input-group">
                  <label>Temple Description</label>
                  <input
                    name="templeDescription"
                    type="text"
                    value={templeDescription}
                    onChange={handleTempleDescriptionChange}
                  required
                  />
                </div>  
                <div className="file-input-group">
                  <label>Address</label>
                  <input
                    name="address"
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                  required
                  />
                </div>
                <div className="file-input-group">
                  <label>Tax ID</label>
                  <input
                    name="taxId"
                    type="text"
                    value={taxId}
                    onChange={handleTaxIdChange}
                  required
                  />
                </div>
                <div className="file-input-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    type="number"
                    value={phone}
                    onChange={handlePhoneChange}
                  required
                  />
                </div>
                <div className="file-input-group">
                  <label>Fax</label>
                  <input
                    name="fax"
                    type="number"
                    value={fax}
                    onChange={handleFaxChange}
                  required
                  />
                </div> 
              </div>
              {/* <!-- Middle Section --> */}
              <div class="middle-section">
                <div className="file-input-group">
                  <label>Website URL</label>
                  <input
                    name="websiteUrl"
                    type="text"
                    value={websiteUrl}
                    onChange={handleWebsiteUrlChange}
                  required
                  />
                  </div>
                  <div className="file-input-group">
                <label>PayPal QR Code Image</label>
                <input
                  name="paypalQrCode"
                  type="file"
                  accept="image/*"
                  onChange={handlePaypalQrCodeChange}
                required
                />
              </div>
              <div className="file-input-group">
                <label>Zelle QR Code Image</label>
                <input
                  name="zelleQrCode"
                  type="file"
                  accept="image/*"
                  onChange={handleZelleQrCodeChange}
                required
                />
              </div>
              <div className="file-input-group">
                <label>Facebook Profile URL</label>
                <input
                  name="facebookUrl"
                  type="text"
                  value={facebookUrl}
                  onChange={handleFacebookUrlChange}
                required
                />
              </div>
              <div className="file-input-group">
                <label>Twitter Profile URL</label>
                <input
                  name="twitterUrl"
                  type="text"
                  value={twitterUrl}
                  onChange={handleTwitterUrlChange}
                required
                />
              </div>
              <div className="file-input-group">
                <label>Instagram Profile URL</label>
                <input
                  name="instagramUrl"
                  type="text"
                  value={instagramUrl}
                  onChange={handleInstagramUrlChange}
                required
                />
              </div>
              </div>
            </div>

            {/* <!-- Grouped Box for Right Section --> */}
            <div class="group-box right-box">
              <h2>Additional Information</h2>
              <div class="right-section">
                <div className="file-input-group">
                  <label>Upload Deity Image</label>
                  <input
                  name="deityImage"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDeityImageFileChange(e, 0)}    
                required   
                  /></div>
                  <div className="file-input-group">
                  <label>Upload Priest Image</label>
                  <input
                  name="priestImage"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handlePriestImageFileChange(e, 0)}  
                required                     
                  /></div>
                  <div className="file-input-group">
                  <label>Upload Chanting</label>
                  <input
                    name="audioFile"
                    type="file"
                    accept=".mp3, audio/*"
                    onChange={(e) => handleAudioFileChange(e, 0)}
                  required
                  />
                  </div>
                  <div className="file-input-group">
                  <label>User Details CSV File</label>
                  <input
                    name="csvFile"
                    type="file"
                    accept=".csv"
                    onChange={handleCsvFileChange}
                  required
                  />
                </div>                     
              </div>
            </div>
          </div>
          <button type="submit" class="submit-button">Submit</button>
        </form>
        </div>
    );
  }

  export default UserDetails;
