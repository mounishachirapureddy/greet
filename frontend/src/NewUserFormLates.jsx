import React, { useState ,useRef} from "react";
const NewUserFormLatest = () => {
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
      console.log(formData.deityImage)
      console.log(deityImage);
      console.log(priestImage)
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
          console.error("Error:", error);
        });     
        // Clear the form fields by setting their values to an empty string
        document.getElementById("clearform").reset()
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
        <React.Fragment>
            <div className="container-xl">
                {/* <div>{JSON.stringify(user)}</div> */}
                <div className="row justify-content-center">
                    <form ref={formRef} id="clearform" className="form-wrapper" onSubmit={handleSubmit}>
                        <h1 style={{ textAlign: 'center' }}>Greetings Messenger Service</h1>
                        <div className="form-container">
                            <div className="row">
                                <div className="col-md-8 group-box">
                                    <h5 style={{ textAlign: 'center' }}>Temple Information</h5>
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <label>Temple Banner </label>
                                            <input type="file" name="templeBanner"  onChange={(e) => handleTempleBannerChange(e, 0)} className="form-control" accept=".jpg, .jpeg, .png" />
                                        </div>
                                        <div className="col-sm-6">
                                            <label>Website URL</label>
                                            <input type="text" onChange={handleWebsiteUrlChange} name="websiteUrl" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <label>Temple Image </label>
                                            <input type="file" name="templeImage" onChange={(e) => handleTempleImageChange(e, 0)} className="form-control" accept=".jpg, .jpeg, .png" />
                                        </div>
                                        <div className="col-sm-6">
                                            <label>PayPal QR Code Image</label>
                                            <input type="file" name="paypalQrCode" onChange={handlePaypalQrCodeChange} className="form-control" accept="image/*" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <label>Temple Description </label>
                                            <input type="text" name="templeDescription"  onChange={handleTempleDescriptionChange} className="form-control" />
                                        </div>
                                        <div className="col-sm-6">
                                            <label>Zelle QR Code Image</label>
                                            <input type="file" name="zelleQrCode" onChange={handleZelleQrCodeChange} className="form-control" accept="image/*" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <label>Address</label>
                                            <input type="text" name="address"  onChange={handleAddressChange} className="form-control" />
                                        </div>
                                        <div className="col-sm-6">
                                            <label>Facebook Profile URL</label>
                                            <input type="text" name="facebookUrl"  onChange={handleFacebookUrlChange} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <label>Tax Id</label>
                                            <input type="text" name="taxId"  onChange={handleTaxIdChange} className="form-control" />
                                        </div>
                                        <div className="col-sm-6">
                                            <label>Twitter Profile URL</label>
                                            <input type="text" name="twitterUrl"  onChange={handleTwitterUrlChange} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <label>Phone</label>
                                            <input type="number" name="phone"  onChange={handlePhoneChange} className="form-control" />
                                        </div>
                                        <div className="col-sm-6">
                                            <label>Instagram Profile URL</label>
                                            <input type="text" name="instagramUrl"  onChange={handleInstagramUrlChange} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <label>Fax</label>
                                            <input type="number" name="fax"  onChange={handleFaxChange} className="form-control" />
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-4 group-box">
                                    <h5 style={{ textAlign: 'center' }}>Additional Information</h5>
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <label>Upload Deity Image</label>
                                            <input type="file" name="deityImage"  onChange={(e) => handleDeityImageFileChange(e, 0)}  className="form-control" accept=".jpg, .jpeg, .png" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <label>Upload Priest Image</label>
                                            <input type="file" name="priestImage"  onChange={(e) => handlePriestImageFileChange(e, 0)}   className="form-control" accept=".jpg, .jpeg, .png" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <label>Upload Chanting</label>
                                            <input type="file" name="audioFile"  onChange={(e) => handleAudioFileChange(e, 0)} className="form-control" accept=".mp3, audio/*" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <label>User Details CSV File</label>
                                            <input type="file" name="csvFile"  onChange={handleCsvFileChange} className="form-control" accept=".csv" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <button type="submit" class="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}
export default NewUserFormLatest;