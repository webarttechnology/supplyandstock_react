import React from "react";
import s1 from "../assets/images/s1.jpg";
import s2 from "../assets/images/s2.jpg";
import s3 from "../assets/images/payment.jpg";
const Buyers = () => {
  return (
    <>
      <div className="bannerHome">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="innerbannerHeading">For Buyers</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="howitWork py-5">
        <div className="container">
          <div className="col-md-12 text-center">
            <div className="ourStoryCont">
              <h2 className="mb-4">How it works</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div class="timeline">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="timeline-container">
                        <div class="timeline-end">
                          <p>
                            STEP <br /> 01
                          </p>
                        </div>
                        <div class="timeline-continue">
                          <div class="row timeline-right">
                            <div class="col-md-6">
                              <div className="howItIMg">
                                <img src="https://images.unsplash.com/photo-1593106410288-caf65eca7c9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFudWZhY3R1cmluZ3xlbnwwfHwwfHw%3D&w=1000&q=80" />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="timeline-box">
                                <div class="timeline-icon">
                                  <i class="fa fa-gift"></i>
                                </div>
                                <div class="timeline-text">
                                  <h4>Lorem ipsum dolor</h4>
                                  <p>
                                    Lorem ipsum dolor sit amet elit ornare velit
                                    non Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Ducimus rem velit nisi
                                    suscipit obcaecati quia placeat itaque
                                    impedit, cumque ipsam voluptas architecto
                                    odit accusamus quod, quasi beatae rerum
                                    atque consectetur.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-12">
                              <div class="timeline-year">
                                <p>
                                  STEP <br /> 02
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="row timeline-left">
                            <div class="col-md-6 d-md-none d-block"></div>
                            <div class="col-md-6">
                              <div class="timeline-box">
                                <div class="timeline-icon d-md-none d-block">
                                  <i class="bi bi-alarm"></i>
                                </div>
                                <div class="timeline-text">
                                  <h4>Lorem ipsum dolor</h4>
                                  <p>
                                    Lorem ipsum dolor sit amet elit ornare velit
                                    non Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Ducimus rem velit nisi
                                    suscipit obcaecati quia placeat itaque
                                    impedit, cumque ipsam voluptas architecto
                                    odit accusamus quod, quasi beatae rerum
                                    atque consectetur.
                                  </p>
                                </div>
                                <div class="timeline-icon d-md-block d-none">
                                  <i class="bi bi-alarm"></i>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6 d-md-block d-none">
                              <div className="howItIMg">
                                <img src="https://www.sentrien.com/wp-content/uploads/2021/05/Manufacturing-Industry.jpg" />
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-12">
                              <div class="timeline-year">
                                <p>
                                  STEP <br /> 03
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="row timeline-right">
                            <div class="col-md-6">
                              <div className="howItIMg">
                                <img src={s3} />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="timeline-box">
                                <div class="timeline-icon">
                                  <i class="fa fa-briefcase"></i>
                                </div>
                                <div class="timeline-text">
                                  <h4>Lorem ipsum dolor</h4>
                                  <p>
                                    Lorem ipsum dolor sit amet elit ornare velit
                                    non Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ea cupiditate aut neque
                                    ipsam, provident repudiandae numquam nulla
                                    facere nesciunt praesentium suscipit nihil
                                    vitae consectetur sunt soluta nobis ex hic
                                    corporis?
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Buyers;
