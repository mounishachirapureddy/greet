import React, { useState } from "react";
import './UserForm.css';

function EditorForm() {
  console.log("Video Uploaded");
  const [videoFile, setVideoFile] = useState(null);
  
  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("videoFile", videoFile);

    fetch("/api/editor-form", {
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
      //Clear the field
      setVideoFile(null);
      alert("Form Submitted Successfully!");   
  };

  return (
    <body>
    <div className="form-wrapper">
    <h1 className="greeting-heading">Greetings Messenger Service</h1>
    <div className="form-container">
      <form className="user-details-form" onSubmit={handleSubmit}>
        <div className="file-input-group">
          <label>Greetings Video File</label>
          <input
            name="videoFile"
            type="file"
            accept=".mp4"
            onChange={handleVideoFileChange} 
            required />            
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div></div>
    </body>
  );
}

export default EditorForm;
