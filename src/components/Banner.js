import React from "react";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <>
      <div className="bannerHome">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              {/* <h4 className="bannerWlcomeHeading">Welcome to</h4>
                        <h1 className="bannnercolorHaed">S<span className="commonColor">upply</span> W<span className="commonColor">e</span> S<span className="commonColor">tock</span></h1> */}
              {/* <div className="searchSec">
                            <div class="search">
                                <span><i class="bi bi-search"></i></span>
                                <input placeholder="Search term" />
                            </div>
                        </div> */}
            </div>
          </div>
          {localStorage.getItem("_userType") === "Buyer" ? (
            <div className="row justify-content-center">
              <div className="col-md-7">
                <div className="bannerSec">
                  <div className="row">
                    <div className="col-md-6">
                      <Link to="/enquiry">
                        <div className="buyerBannrBox">
                          <i class="bi bi-plus-lg"></i>
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <Link to="/order" state={{ data: "1" }}>
                        <div className="buyerBannrBox">
                          <h3>Past orders</h3>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : localStorage.getItem("_userType") === "Seller" ? (
            ""
          ) : (
            <div className="userSection">
              <div className="row justify-content-center">
                <div className="col-md-2">
                  <div className="usertypeBox">
                    <span>
                      <Link to="/buyer/login">
                        Buyer <i class="bi bi-arrow-right"></i>
                      </Link>
                      {/* <div className="userBtn">
                                        <Link to="/buyer/login">Login </Link>
                                        <Link to="/buyer/login">SignUp </Link>
                                    </div> */}
                    </span>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="usertypeBox">
                    <span>
                      <Link to="/seller/login">
                        Seller <i class="bi bi-arrow-right"></i>
                      </Link>
                      {/* <div className="userBtn">
                                        <Link to="/seller/login">Login </Link>
                                        <Link to="/seller/login">SignUp </Link>
                                    </div> */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Banner;
