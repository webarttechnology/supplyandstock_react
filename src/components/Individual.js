import React from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import * as API from "../api/index";
import { cuntryData, usStateList } from "../helpers/commonData";
const parsonalInit = {
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  dd: "",
  mm: "",
  yy: "",
  ssn_last_4: "",
  account_number: "",
  routing_number: "",
  mcc: "",
  url: "",
  city: "",
  country: "",
  line1: "",
  postal_code: "",
  state: "",
  mobile: "",
};

const Individual = ({ userEmail, businessTypes, userDetails }) => {
  const [parsonalData, setParsonalData] = useState(parsonalInit);
  const [dateValue, setDateValue] = useState([]);

  // ? INPUT HANDALER

  const handalerChanges = (e) => {
    if (e.target.name === "dob") {
      console.log("date", e.target.value);
      const date = e.target.value;
      const myArray = date.split("-");
      console.log("myArray", myArray);
      setDateValue(myArray);
    }
    const { name, value } = e.target;
    setParsonalData({ ...parsonalData, [name]: value });
  };
  const activeAcount = async () => {
    try {
      const reqObj = {
        type: "custom",
        country: "US",
        email: userEmail,
        business_type: businessTypes,
        tos_acceptance: { date: Math.floor(Date.now() / 1000), ip: "8.8.8.8" },
        individual: {
          email: userEmail,
          first_name: parsonalData.first_name,
          last_name: parsonalData.last_name,
          phone: `+1` + parsonalData.phone,
          dob: {
            day: dateValue[2],
            month: dateValue[1],
            year: dateValue[0],
          },
          //ssn_last_4: parsonalData.ssn_last_4,
        },
        external_account: {
          object: "bank_account",
          country: "US",
          currency: "usd",
          account_number: parsonalData.account_number,
          routing_number: parsonalData.routing_number,
        },
        business_profile: {
          //mcc: parsonalData.mcc,
          url: parsonalData.url,
        },
        company: {
          address: {
            city: parsonalData.city,
            country: "US",
            line1: parsonalData.line1,
            postal_code: parsonalData.postal_code,
            state: parsonalData.state,
          },
          phone: `+1` + parsonalData.mobile,
        },
        capabilities: {
          transfers: { requested: true },
        },
      };
      console.log("reqObj", reqObj);
      const response = await API.Active_stripe_account(reqObj);
      if (response.data.success === 1) {
        userDetails();
        toast(response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast(response.data.raw.message, {
          position: "top-right",
          autoClose: 5000,
          type: "error",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      console.log("response", response);
    } catch (error) {}
  };

  // ?VALIDATION BUTTON
  const validationButton = () => {
    if (!parsonalData.first_name) {
      toast("Please enter your first name", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!parsonalData.last_name) {
      toast("Please enter your last name", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!parsonalData.phone) {
      toast("Please enter your phone no", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!parsonalData.dob) {
      toast("Please enter your date of birth", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!parsonalData.account_number) {
      toast("Please enter your account number", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!parsonalData.routing_number) {
      toast("Please enter your routing number", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!parsonalData.url) {
      toast("Please enter your website url", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!parsonalData.city) {
      toast("Please enter your city", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!parsonalData.line1) {
      toast("Please enter your line1", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!parsonalData.postal_code) {
      toast("Please enter your postal code", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!parsonalData.state) {
      toast("Please enter your state", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!parsonalData.mobile) {
      toast("Please enter your mobile", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const btnDisable =
    !parsonalData.first_name ||
    !parsonalData.last_name ||
    !parsonalData.phone ||
    !parsonalData.dob ||
    !parsonalData.account_number ||
    !parsonalData.routing_number ||
    !parsonalData.url ||
    !parsonalData.city ||
    !parsonalData.line1 ||
    !parsonalData.postal_code ||
    !parsonalData.state ||
    !parsonalData.mobile;

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <label>Country</label>
          <select className="form-control">
            <option value="US">US</option>
          </select>
        </div>
        <div className="col-md-6">
          <label>Email</label>
          <input
            readOnly
            value={userEmail}
            type="email"
            className="form-control"
          />
        </div>
      </div>
      <div className="row mt-2">
        <h4>Personal Information</h4>
        <div className="col-md-4">
          <label>First name</label>
          <input
            placeholder="First name"
            type="text"
            onChange={handalerChanges}
            value={parsonalData.first_name}
            name="first_name"
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label>Last name</label>
          <input
            placeholder="Last name"
            type="text"
            onChange={handalerChanges}
            value={parsonalData.last_name}
            name="last_name"
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label>Phone number</label>
          <div className="mobileNumber d-none editPro mt-2">
            <select
              className="mobileCode"
              //onChange={(e) => setDialCode(e.target.value)}
            >
              {cuntryData.map((item, index) => (
                <>
                  {item.code === "US" ? (
                    <option
                      name="category"
                      key={item.name}
                      value={item.dial_code}
                    >
                      {item.dial_code}
                    </option>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </select>
            <NumberFormat
              className="mobileNumberF"
              placeholder="Enter mobile number"
              format="(###)###-####"
              mask="_"
              name="phone"
              onChange={handalerChanges}
              value={parsonalData.phone}
            />
          </div>
          <input
            maxLength={10}
            placeholder="Phone number"
            name="phone"
            onChange={handalerChanges}
            value={parsonalData.phone}
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label>Email</label>
          <input
            readOnly
            value={userEmail}
            name="email"
            type="email"
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label>Date of birth</label>
          <input
            type="date"
            name="dob"
            onChange={handalerChanges}
            value={parsonalData.dob}
            className="form-control"
          />

          <div className="row d-none">
            <div className="col-md-4">
              <input
                type="text"
                name="dd"
                onChange={handalerChanges}
                value={parsonalData.dd}
                placeholder="DD"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <input
                placeholder="MM"
                onChange={handalerChanges}
                value={parsonalData.mm}
                name="mm"
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-4 px-0">
              <input
                placeholder="YY"
                onChange={handalerChanges}
                value={parsonalData.yy}
                name="yy"
                type="text"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 d-none">
          <label>Ssn code</label>
          <input
            maxLength={4}
            type="text"
            name="ssn_last_4"
            onChange={handalerChanges}
            value={parsonalData.ssn_last_4}
            placeholder="Ssn code"
            className="form-control"
          />
        </div>
      </div>
      <div className="row mt-2">
        <h4>Bank account or debit card</h4>
        <div className="col-md-6">
          <label>Routing Number</label>
          <input
            name="routing_number"
            type="text"
            onChange={handalerChanges}
            value={parsonalData.routing_number}
            placeholder="Routing Number"
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label>Bank Account Number</label>
          <input
            name="account_number"
            placeholder="Bank Account Number"
            onChange={handalerChanges}
            value={parsonalData.account_number}
            type="text"
            className="form-control"
          />
        </div>
      </div>
      <div className="row mt-2">
        <h4>Business profile</h4>
        <div className="col-md-6 d-none">
          <label>MCC No</label>
          <input
            name="mcc"
            placeholder="MCC No"
            onChange={handalerChanges}
            value={parsonalData.mcc}
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-md-12">
          <label>Business Url</label>
          <input
            placeholder="URL"
            type="text"
            name="url"
            onChange={handalerChanges}
            value={parsonalData.url}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mt-2">
        <h4>Owner's address</h4>
        <div className="col-md-4">
          <label>Country</label>
          <select
            name="country"
            className="form-control"
            onChange={handalerChanges}
            value={parsonalData.country}
          >
            <option value="US">US</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Line Address</label>
          <input
            name="line1"
            placeholder="Line Address"
            onChange={handalerChanges}
            value={parsonalData.line1}
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label>City</label>
          <input
            placeholder="City"
            name="city"
            onChange={handalerChanges}
            value={parsonalData.city}
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label>State</label>
          <select
            name="state"
            onChange={handalerChanges}
            className="form-control"
          >
            <option>--- Select ---</option>
            {usStateList.map((item, index) => (
              <option value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label>Zip Code</label>
          <input
            name="postal_code"
            placeholder="Zip Code"
            onChange={handalerChanges}
            value={parsonalData.postal_code}
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label>Phone</label>
          <div className="mobileNumber d-none editPro mt-2">
            <select
              className="mobileCode"
              //onChange={(e) => setDialCode(e.target.value)}
            >
              {cuntryData.map((item, index) => (
                <>
                  {item.code === "US" ? (
                    <option
                      name="category"
                      key={item.name}
                      value={item.dial_code}
                    >
                      {item.dial_code}
                    </option>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </select>
            <NumberFormat
              className="mobileNumberF"
              placeholder="Enter mobile number"
              format="(###)###-####"
              mask="_"
              name="mobile"
              onChange={handalerChanges}
              value={parsonalData.mobile}
            />
          </div>
          <input
            name="mobile"
            maxLength={10}
            placeholder="Phone No"
            onChange={handalerChanges}
            value={parsonalData.mobile}
            type="text"
            className="form-control"
          />
        </div>
      </div>
      {btnDisable ? (
        <button
          onClick={validationButton}
          className="bannerBtn border-0 text-center w-50 mt-4"
        >
          Active
        </button>
      ) : (
        <button
          disabled={btnDisable}
          onClick={activeAcount}
          className="bannerBtn border-0 text-center w-50 mt-4"
        >
          Active
        </button>
      )}
    </>
  );
};

export default Individual;
