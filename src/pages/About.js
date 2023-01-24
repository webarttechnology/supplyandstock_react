import React from "react";
import OurStory from "../components/OurStory";

const About = () => {
  return (
    <>
      <div className="bannerHome">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="innerbannerHeading">About us</h2>
            </div>
          </div>
        </div>
      </div>
      <OurStory />
    </>
  );
};

export default About;
