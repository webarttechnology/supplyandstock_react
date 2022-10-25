import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import * as API from "../api/index";
const PaymentSuccuess = () => {
  const parame = useParams();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loader, setLoader] = useState(true);
  console.log("parame", parame);

  const paymentStatus_details = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const reqObj = {
        session_id: parame.id,
      };
      const response = await API.payment_details(reqObj, header);
      console.log("response", response);
      if (response.data.success === 1) {
        setLoader(false);
      } else {
        setLoader(false);
      }
      setPaymentStatus(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    paymentStatus_details();
  }, []);

  return (
    <div className="container">
      <div className="justify-content-center row">
        {loader ? (
          <img
            src="https://cdn.dribbble.com/users/5484/screenshots/2145786/for_dribbble.gif"
            alt=""
            className="loaderImg"
          />
        ) : (
          <div className="col-md-5">
            <div class="cardT my-5">
              {paymentStatus === "paid" ? (
                <>
                  <div className="chekIcon">
                    <i class="checkmark">✓</i>
                  </div>
                  <h1>Payment Success</h1>
                  <p>Payment has been successfully done</p>
                  <Link to="/" className="backbtn">
                    Back to home
                  </Link>
                </>
              ) : (
                <>
                  <div className="chekIcon ">
                    <i class="checkmark cross">X</i>
                  </div>
                  <h1>Payment Error</h1>
                  {/* <p>
                  Payment has been
                  <br /> successfully done
                </p> */}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccuess;
