import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as API from "../api/index";
import Individual from "../components/Individual";
import { ThreeDots, Vortex } from "react-loader-spinner";
const ActiveAccount = ({ userEmail }) => {
  const [businessTypes, setBusinessTypes] = useState("");
  const [activeAccount, setActiveAccount] = useState(false);
  const [stripAcc, setStripAcc] = useState("");
  const [stripeLink, setStripeLink] = useState("");
  const [isActive, setIsActive] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const userDetails = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const sellerResponse = await API.manufacturer_saller(
        localStorage.getItem("__userId"),
        header
      );

      const response = await API.account_details(
        sellerResponse.data.data.strip_acc,
        header
      );
      setAccountDetails(response.data.data);
      if (sellerResponse.data.data.strip_acc) {
        setActiveAccount(true);
        // setLoader(false);
        setStripAcc(sellerResponse.data.data.strip_acc);
      }
      if (sellerResponse.data.data.isActive) {
        setIsActive(sellerResponse.data.data.isActive);
        // setLoader(true);
      }
    } catch (error) {}
  };

  const businessType = (e) => {
    setBusinessTypes(e.target.value);
  };

  useEffect(() => {
    userDetails();
  }, []);

  return (
    <>
      <div className="activeAcount">
        <div className="container px-0">
          <div className="align-items-center justify-content-center row">
            <div className="col-md-12 text-center">
              {accountDetails === "" ? (
                <ThreeDots
                  height="30"
                  width="100%"
                  radius="9"
                  color="#9b6a6cdb"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                <>
                  {activeAccount ? (
                    <>
                      <h2 className="accountHead">Stripe Account Number</h2>
                      <div className="align-items-center d-flex flex-column justify-content-evenly mt-4">
                        <div className="align-items-baseline d-flex">
                          <span>
                            <label className="me-3 text-danger">
                              Stripe account number :
                            </label>
                          </span>
                          <span className="stripAc">{stripAcc}</span>
                        </div>
                        {isActive === "1" ? (
                          <>
                            <span className="checkAcount mt-2 mb-4">
                              <i class="bi bi-check-circle"></i>
                            </span>
                            <div className="">
                              <ul>
                                <li className="align-items-baseline d-flex">
                                  <span>
                                    <label className="me-3 text-info">
                                      {accountDetails.business_type ===
                                      "individual"
                                        ? " Account name : "
                                        : " Business name :"}
                                    </label>
                                  </span>
                                  <div>
                                    {accountDetails.business_type ===
                                    "individual" ? (
                                      <>
                                        <span className="stripAc">
                                          {accountDetails === null
                                            ? ""
                                            : accountDetails.individual
                                                .first_name}
                                        </span>
                                        <span className="stripAc ms-2">
                                          {accountDetails === null
                                            ? ""
                                            : accountDetails.individual
                                                .last_name}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span className="stripAc ms-2">
                                          {accountDetails === null
                                            ? ""
                                            : accountDetails.business_profile
                                                .name}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </li>
                                <li className="align-items-baseline d-flex">
                                  <span>
                                    <label className="me-3 text-info">
                                      Account number :
                                    </label>
                                  </span>
                                  <span className="stripAc">
                                    {accountDetails.id}
                                  </span>
                                </li>
                                <li className="align-items-baseline d-flex">
                                  <span>
                                    <label className="me-3 text-info">
                                      Business type :
                                    </label>
                                  </span>
                                  <span className="stripAc">
                                    {accountDetails.business_type}
                                  </span>
                                </li>
                                <li className="align-items-baseline d-flex">
                                  <span>
                                    <label className="me-3 text-info">
                                      Account email :
                                    </label>
                                  </span>
                                  <span className="stripAc">
                                    {accountDetails.email}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="align-items-baseline d-flex"></div>
                            <div className="align-items-baseline d-flex"></div>
                            <div className="align-items-baseline d-flex"></div>
                          </>
                        ) : (
                          <>
                            <label className="mt-4">
                              In order to receive payouts, please activate
                            </label>
                            <a
                              target="_blank"
                              href={stripeLink}
                              className="bannerBtn border-0 text-center w-50 mt-3"
                            >
                              Activate
                            </a>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="menuHading">
                        Below information is solely used to create a stripe
                        account on your behalf and no data will be stored in our
                        application
                      </h3>
                      <div className="row justify-content-center">
                        <div className="col-md-7">
                          <label>Choose business type</label>
                          <select
                            onChange={businessType}
                            className="form-control mb-2"
                          >
                            <option>--- Select business type ---</option>
                            <option value="company">Company</option>
                            <option value="individual">Individual</option>
                            <option value="non_profit">Non-profit</option>
                            <option value="government_entity">
                              Government entity
                            </option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          {activeAccount ? (
            ""
          ) : (
            <>
              {businessTypes === "company" ? (
                <Individual
                  userDetails={userDetails}
                  businessTypes={businessTypes}
                  userEmail={userEmail}
                  setStripeLink={setStripeLink}
                />
              ) : businessTypes === "individual" ? (
                <Individual
                  userDetails={userDetails}
                  businessTypes={businessTypes}
                  userEmail={userEmail}
                  setStripeLink={setStripeLink}
                />
              ) : businessTypes === "non_profit" ? (
                <Individual
                  userDetails={userDetails}
                  businessTypes={businessTypes}
                  userEmail={userEmail}
                  setStripeLink={setStripeLink}
                />
              ) : businessTypes === "government_entity" ? (
                <Individual
                  userDetails={userDetails}
                  businessTypes={businessTypes}
                  userEmail={userEmail}
                  setStripeLink={setStripeLink}
                />
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ActiveAccount;
