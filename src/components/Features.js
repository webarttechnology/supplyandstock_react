import React from "react";

const Features = () => {
  return (
    <>
      <div className="features section-services">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="ourStoryCont">
                <h2 className="mb-4">What Makes Us Stand Out</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-lg-4">
              <div class="single-service">
                <div class="part-1">
                  <img src="images/free.png" className="w-25" />
                  <h3 class="title mt-3">Zero Registration Fee</h3>
                </div>
                <div class="part-2">
                  <p class="description">
                    From registration to orders, our platform is free for
                    Sellers with zero hidden costs
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="single-service">
                <div class="part-1">
                  <img src="images/questions.png" className="w-25" />
                  <h3 class="title mt-3">Receive Buyer Inquiry Real-time</h3>
                </div>
                <div class="part-2">
                  <p class="description">
                    Get multiple inquiries as soon as they are placed by the
                    buyers through notifications
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="single-service">
                <div class="part-1">
                  <img src="images/chat.png" className="w-25" />
                  <h3 class="title mt-3">Chat Directly With Buyers</h3>
                </div>
                <div class="part-2">
                  <p class="description">
                    Interact with buyers directly through Live Chat and boost
                    the chance of sale by 10X
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="single-service">
                <div class="part-1">
                  <img src="images/cash-payment.png" className="w-25" />
                  <h3 class="title mt-3">Instant Vendor Payouts</h3>
                </div>
                <div class="part-2">
                  <p class="description">
                    Get paid instantly and transfer your earnings directly to
                    your bank account hassle-free
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="single-service">
                <div class="part-1">
                  <img src="images/0-percent.png" className="w-25" />
                  <h3 class="title mt-1">Zero Commission for Vendors</h3>
                </div>
                <div class="part-2">
                  <p class="description">
                    Pay no commission and earn top dollar for your product
                    through our vendor friendly ecosystem
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="single-service">
                <div class="part-1">
                  <img src="images/best-price.png" className="w-25" />
                  <h3 class="title">Self Service Pricing</h3>
                </div>
                <div class="part-2">
                  <p class="description">
                    Offer personalized pricing for each buyer to give you full
                    control over your pricing configuration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
