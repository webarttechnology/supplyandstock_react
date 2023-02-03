import React from "react";
import video1 from "../assets/images/video1.mp4";
import video2 from "../assets/images/video2.mp4";
const Video = ({ landingpage }) => {
  return (
    <div>
      <div
        className="videoSec"
        style={{ paddingBottom: landingpage ? "50px" : "" }}
      >
        <div className="container">
          <div className="col-md-12 text-center">
            <div className="ourStoryCont">
              <h2 className="mb-4">The Right B2B Marketplace</h2>
              <h2 className="mb-5">For Your Business</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h4>Who is SWS</h4>
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
            <div className="col-md-6">
              <h4>Website navigation</h4>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
