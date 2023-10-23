/*import React, { useState } from "react";

function VideoPage() {
  return (
    <div>
      <h1 align='center'>Happy Birthday!</h1>
        <div className="video-wrapper">
          <video width="900" height="500" controls>
            <source src="https://drive.google.com/file/d/1QJjqmldUOheEtgAgMS_ZtZGgowzSn8tZ/view?usp=sharing" type="video/mp4"/>
              Your browser does not support the video tag.
          </video>
        </div>
    </div>
  );
}
export default VideoPage;
*/

import React from "react";

function VideoPage() {
  return (
    <div>
      <h1 align="center">Happy Birthday!</h1>
      <div className="video-wrapper">
        <iframe
          width="900"
          height="500"
          //src="https://www.veed.io/view/dc7a4afe-7018-4179-be56-b24f7b01740f?panel=share"
          //src="https://www.veed.io/view/6c156033-53a5-4f6c-ba5f-5485e411b700?panel=share"
          src="http://localhost:3009/api/getVideo"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default VideoPage;

