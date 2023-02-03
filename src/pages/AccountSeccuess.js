import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const AccountSeccuess = () => {
  return (
    <>
      <Helmet>
        <script type="text/javascript">{`{"gtag('event', 'conversion', {'send_to': 'AW-11084307641/0chaCI2IwooYELm5tKUp'});"}`}</script>
      </Helmet>
      {/* <Helmet>
        <script>
             gtag('event', 'conversion', {'send_to': 'AW-11084307641/0chaCI2IwooYELm5tKUp'});
        </script>
      </Helmet> */}

      <div className="successAccount">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div class="wrapperAlert">
                <div class="contentAlert">
                  <div class="topHalf">
                    <p>
                      <svg
                        viewBox="0 0 512 512"
                        width="100"
                        title="check-circle"
                      >
                        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                      </svg>
                    </p>
                    <h1>Congratulations</h1>

                    <ul class="bg-bubbles">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>

                  <div class="bottomHalf">
                    <p>
                      Well Done You Have Successfully Registered as a Seller
                      with Us
                    </p>
                    <Link to="/user-dashboard" className="bannerBtn">
                      Go To Dashboard
                    </Link>
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

export default AccountSeccuess;
