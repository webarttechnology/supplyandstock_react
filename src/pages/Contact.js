import React from "react";
import GetTouch from "../components/GetTouch";

const Contact = () => {
  return (
    <>
      <div className="bannerHome">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="innerbannerHeading">Contact us</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="contactUsPage footer_get_touch_outer">
        <div className="container">
          <div class="footer_get_touch_inner grid-70-30">
            <div class="colmun-70 get_form">
              <div class="get_form_inner">
                <div class="get_form_inner_text">
                  <h3>Get In Touch</h3>
                </div>
                <div class="grid-50-50 froms">
                  <input type="text" placeholder="First Name" />
                  <input type="text" placeholder="Last Name" />
                  <input type="email" placeholder="Email" />
                  <input type="tel" placeholder="Phone" />
                </div>
                <div class="grid-full">
                  <textarea
                    placeholder="Message hare"
                    cols="10"
                    rows="5"
                  ></textarea>
                  <input type="submit" value="Submit" />
                </div>
              </div>
            </div>
            <div class="colmun-30 get_say_form">
              <h5>Say Hi!</h5>
              <ul class="get_say_info_sec">
                <li>
                  <i class="fa fa-envelope"></i>
                  <a href="mailto:">info@swshelp.com</a>
                </li>
                <li>
                  <i class="bi bi-whatsapp"></i>
                  <a href="tel:">+1 4541255455</a>
                </li>
                <li>
                  <i class="bi bi-geo-alt"></i>
                  <a href="#">2072 Romines Mill Road</a>
                </li>
              </ul>
              <ul class="get_say_social-icn">
                <li>
                  <a href="#">
                    <i class="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
