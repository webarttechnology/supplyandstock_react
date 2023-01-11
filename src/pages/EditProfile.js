import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as API from "../api/index";
import { cuntryData } from "../helpers/commonData";
const initialData = {
  firstName: "",
  lastName: "",
  emailId: "",
  mobileNo: "",
};

const EditProfile = ({ setIsLogin, setUserEmail, setActiveAcount }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [dialCode, setDialCode] = useState("");
  const [mobileData, setMobileData] = useState("");

  const handleCountrySelect = (e) => {
    setDialCode(e.target.value);
  };

  const handalerChnages = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const upDateSubmitBtn = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const reqObj = {
        id: localStorage.getItem("__userId"),
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNo: `+1${mobileData}`
          ? `+1${mobileData}`
          : `+1${formData.mobileNo}`,
      };

      if (localStorage.getItem("_userType") === "Buyer") {
        const response = await API.user_update_buyer(reqObj, header);

        if (response.data.success === 1) {
          userData_details();
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
          localStorage.removeItem("__userId");
          localStorage.removeItem("_tokenCode");
          localStorage.removeItem("_userType");
          localStorage.removeItem("isLoginCheck");
          setIsLogin(localStorage.removeItem("isLoginCheck"));
          navigate("/", { state: response.data.message });
        }
      } else {
        const response = await API.user_update_seller(reqObj, header);

        if (response.data.success === 1) {
          userData_details();
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
          localStorage.removeItem("__userId");
          localStorage.removeItem("_tokenCode");
          localStorage.removeItem("_userType");
          localStorage.removeItem("isLoginCheck");
          setIsLogin(localStorage.removeItem("isLoginCheck"));
          navigate("/", { state: response.data.message });
        }
      }
    } catch (error) {}
  };

  const userData_details = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      if (localStorage.getItem("_userType") === "Buyer") {
        const BuyerResponse = await API.manufacturer_buyer(
          localStorage.getItem("__userId"),
          header
        );

        if (BuyerResponse.data.data === null) {
          localStorage.removeItem("__userId");
          localStorage.removeItem("_tokenCode");
          localStorage.removeItem("_userType");
          localStorage.removeItem("isLoginCheck");
          setIsLogin(localStorage.removeItem("isLoginCheck"));
          navigate("/");
        }
        setFormData(BuyerResponse.data.data);
        setUserEmail(BuyerResponse.data.data.email);
        const mobileDatas = BuyerResponse.data.data.mobileNo.substring(2);
        setMobileData(mobileDatas);
      } else {
        const sellerResponse = await API.manufacturer_saller(
          localStorage.getItem("__userId"),
          header
        );
        if (sellerResponse.data.data === null) {
          localStorage.removeItem("__userId");
          localStorage.removeItem("_tokenCode");
          localStorage.removeItem("_userType");
          localStorage.removeItem("isLoginCheck");
          setIsLogin(localStorage.removeItem("isLoginCheck"));
          navigate("/");
        }
        if (sellerResponse.data.data.isActive) {
          setActiveAcount(true);
        }
        console.log("sellerResponse.data.data", sellerResponse.data.data);
        setFormData(sellerResponse.data.data);
        setUserEmail(sellerResponse.data.data.emailId);
        const mobileDatas = sellerResponse.data.data.mobileNo.substring(2);
        setMobileData(mobileDatas);
      }
    } catch (error) {}
  };

  useEffect(() => {
    userData_details();
  }, []);

  return (
    <>
      <div className="row mb-4">
        <div className="col-md-6">
          <label for="exampleFormControlInput1" class="form-label">
            First Name
          </label>
          <input
            type="text"
            class="form-control"
            onChange={handalerChnages}
            value={formData.firstName}
            name="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="col-md-6">
          <label for="exampleFormControlInput1" class="form-label">
            Last Name
          </label>
          <input
            class="form-control"
            onChange={handalerChnages}
            value={formData.lastName}
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <label for="exampleFormControlInput1" class="form-label">
            Email Adderss
          </label>
          <input
            type="email"
            class="form-control"
            onChange={handalerChnages}
            value={formData.emailId}
            readOnly
            placeholder="name@example.com"
          />
        </div>
        <div className="col-md-6">
          <label for="exampleFormControlInput1" class="form-label">
            Mobile Number
          </label>
          <div className="mobileNumber editPro mt-2">
            <select
              className="mobileCode"
              onChange={(e) => setDialCode(e.target.value)}
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
              //onChange={handalerChnages}
              onChange={(e) => setMobileData(e.target.value)}
              mask="_"
              name="mobileNo"
              value={mobileData}
            />
          </div>
        </div>
      </div>
      <div className="justify-content-center mb-4 row">
        <div className="col-md-4">
          <span class="bannerBtn text-center w-100" onClick={upDateSubmitBtn}>
            Update
          </span>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
