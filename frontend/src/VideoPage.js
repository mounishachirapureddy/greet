import React, { useState } from "react";

function VideoPage() {
  return (
    <div>
      <h1 align='center'>Happy Birthday!</h1>
        <div className="video-wrapper">
          <video width="900" height="500" controls>
            <source src="/api/getVideo" type="video/mp4"/>
              Your browser does not support the video tag.
          </video>
        </div>
    </div>
  );
}
export default VideoPage;
