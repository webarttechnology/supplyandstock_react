import React from "react";
import { Link } from "react-router-dom";
import fiest from "../assets/images/sas.png";
import secnd from "../assets/images/sadsadasd.png";
import thard from "../assets/images/assasa.png";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center ps-0">
              <div className="fotterMenu">
                <ul className="ps-0">
                  <li>
                    <Link to="/">CONTACT</Link>
                  </li>
                  <li>
                    <Link to="/">TERMS OF SERVICES</Link>
                  </li>
                  <li>
                    <Link to="/"> SHIPPING AND RETURNS</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 d-none">
              <input
                type="text"
                className="fooetrInput"
                placeholder="Give an email, get the newsletter"
              />
            </div>
            <div className="col-md-1 col-4 text-center d-none">
              <img src={secnd} alt="" />
            </div>
            <div className="col-md-1 col-4 text-center d-none">
              <img src={fiest} alt="" />
            </div>
            <div className="col-md-1 col-4 text-center d-none">
              <img src={thard} alt="" />
            </div>
          </div>
          <div className="row mt-5 justify-content-center">
            <div className="col-md-8 text-center">
              <p className="userTextFoter">
                © 2022 SWS. Terms of use and privacy policy
              </p>
            </div>
            <div className="col-md-4 d-none">
              <ul className="ps-0 socilIcon">
                <li>
                  <Link to="/">
                    <i class="bi bi-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i class="bi bi-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i class="bi bi-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i class="bi bi-linkedin"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i class="bi bi-pinterest"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
