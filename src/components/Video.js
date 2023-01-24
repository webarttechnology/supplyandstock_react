import React from "react";
import video1 from "../assets/images/video1.mp4";
import video2 from "../assets/images/video2.mp4";
const Video = () => {
  return (
    <div>
      <div className="videoSec">
        <div className="container">
          <div className="col-md-12 text-center">
            <div className="ourStoryCont">
              <h2 className="mb-5">Lorem ipsum dolor</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                <video
                loop
                muted
                autoplay
                playsinline
                src=${video1}
                class="loaderVido"
                />,
            `,
                }}
              ></div>
            </div>
            <div className="col-md-6">
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                <video
                loop
                muted
                autoplay
                playsinline
                src=${video2}
                class="loaderVido"
                />,
            `,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
