import React from "react";
import { Link } from "react-router-dom";
import ourStoryImg from "../assets/images/about.jpg";

const OurStory = ({ landingpage }) => {
  return (
    <>
      <div className="ourStory">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="ourStoryCont">
                <h2 className="mb-4">About SWS</h2>
                <h3>Grow Your Business by 10X with Zero Investment</h3>
                <p className="bannerText">
                  Are you a vendor looking to connect with buyers nationwide,
                  without incurring any overhead costs? Look no further! Our B2B
                  platform offers a simple to grow your business
                </p>
                <p className="bannerText">
                  Presenting a unique B2B platform to connect vendors and buyers
                  all over the country with zero overhead cost for the vendors.
                  <br />
                  Register with Us Today to get premium benefits
                </p>

                {landingpage ? (
                  <>
                    <a href="#lendingSeller" className="bannerBtn me-3">
                      Register Now
                    </a>
                    <Link to="/process-seller" className="bannerBtn">
                      How It Works
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/about" className="bannerBtn me-3">
                      Register Now
                    </Link>
                    <Link to="/sellers" className="bannerBtn">
                      How It Works
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="ourImgSec">
                <img src={ourStoryImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStory;
