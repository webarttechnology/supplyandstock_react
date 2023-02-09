import React, { useState } from "react";
import * as appUtils from "../helpers/appUtils";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as API from "../api/index";
import OTPInput from "otp-input-react";
import { useNavigate } from "react-router";
import NumberFormat from "react-number-format";
import { cuntryData } from "../helpers/commonData";
import Modal from "react-responsive-modal";
import { ThreeDots } from "react-loader-spinner";
const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNo: "",
  password: "",
  confirmPassword: "",
};
const initialDatalog = {
  emailId: "",
  password: "",
};

const initialDatalogPass = {
  password: "",
  confirmPassword: "",
};

const SignupBuyer = ({ setIsLogin }) => {
  // ???? BUYERS LOGIN AND SIGNUP PAGE

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [dialCode, setDialCode] = useState("");
  const [isEmail, setIsEmail] = useState(0);
  const [OTP, setOTP] = useState("");
  const [loginData, setLoginData] = useState(initialDatalog);
  const [newEmailData, setNewEmailData] = useState("");
  const [isForgot, setIsForgot] = useState(0);
  const [passWordData, setPassWordData] = useState(initialDatalogPass);
  const [openModal, setOpenModal] = useState(false);

  //ERROR-MSGS
  const [errorMsg, setErrorMsg] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmErrorPasword, setConfirmErrorPasword] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [mobileErrorInner, setMobileErrorInner] = useState("");
  const [selected, setSelected] = useState("Buyer");
  const [selectedLogin, setSelectedLogin] = useState("Buyer");
  const [selectedForgot, setSelectedForgot] = useState("Buyer");
  const [otpError, setOtpError] = useState("");
  const [newPassError, setNewPassError] = useState("");
  const [newPassErrorCon, setNewPassErrorCon] = useState("");

  const handalerChnages = (e) => {
    const { name, value } = e.target;
    setLoading(false);
    switch (name) {
      case "email":
        setErrorEmail("");
        setErrorMsg(false);
        break;
      case "firstName":
        setErrorName("");
        break;
      case "lastName":
        setErrorLastName("");
        break;
      case "mobileNo":
        setMobileError("");
        setMobileErrorInner("");
        break;
      case "password":
        setErrorPassword("");
        break;
      case "confirmPassword":
        setConfirmErrorPasword("");
        break;
      default:
    }
    setFormData({ ...formData, [name]: value });
  };

  // ? login handaler
  const loginHandaler = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  // ? sign up
  const handleChange = (event) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  // ? login type
  const handleChangeLogin = (event) => {
    console.log(event.target.value);
    setSelectedLogin(event.target.value);
  };
  // ? login type
  const handleChangeforgot = (event) => {
    console.log(event.target.value);
    setSelectedForgot(event.target.value);
  };

  const handleCountrySelect = (e) => {
    setDialCode(e.target.value);
  };

  // ?=========== submit handaler ============
  const submitHandaler = async () => {
    setLoading(true);
    let flag = validate();
    if (!flag) {
      setLoading(false);
      return;
    }
    if (selected === "Buyer") {
      try {
        const reqObj = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailId: formData.email,
          mobileNo: `+1${formData.mobileNo}`,
          password: formData.password,
        };

        if (formData.mobileNo === "") {
          setMobileErrorInner("Please enter your mobile number.");
        } else if (formData.mobileNo.length < 10) {
          setMobileErrorInner("Please enter valid mobile number");
        } else {
          const response = await API.user_registration_buyer(reqObj);
          if (response.data.success === 1) {
            const headerObj = {
              Authorization: `Bearer ${response.data.token_code}`,
            };
            //navigate("/user-dashboard");
            localStorage.setItem("_tokenCode", JSON.stringify(headerObj));
            localStorage.setItem("_userType", selected);
            setLoading(false);
            setIsEmail(1);
            localStorage.setItem("__userId", response.data.data._id);
          } else {
            toast(response.data.msg, {
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
            setLoading(false);
          }
        }
      } catch (error) {}
    } else {
      try {
        const reqObj = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailId: formData.email,
          mobileNo: dialCode + formData.mobileNo,
          password: formData.password,
        };

        const response = await API.user_registration_seller(reqObj);

        if (response.data.success === 1) {
          const headerObj = {
            Authorization: `Bearer ${response.data.token_code}`,
          };
          localStorage.setItem("_tokenCode", JSON.stringify(headerObj));
          setLoading(false);
          setIsEmail(1);
          localStorage.setItem("__userId", response.data.data._id);
        } else {
          setErrorMsg(response.data.msg);
          setLoading(false);
        }
      } catch (error) {}
    }
  };

  // ? EMAIL OTP VERIFACTION
  const emaitVerifaction = async () => {
    if (selected === "Buyer") {
      try {
        const reqObj = {
          id: formData.email,
          otp: OTP,
        };

        const response = await API.user_buyer_mailVerifi(reqObj);

        if (response.data.success === 1) {
          const headerObj = {
            Authorization: `Bearer ${response.data.token_code}`,
          };
          localStorage.setItem("_tokenCode", JSON.stringify(headerObj));
          localStorage.setItem("isLoginCheck", true);
          setIsLogin(localStorage.getItem("isLoginCheck"));
          localStorage.setItem("_userType", selected);
          navigate("/user-dashboard");
        } else {
          setOtpError(response.data.msg);
        }
      } catch (error) {}
    } else {
      try {
        const reqObj = {
          id: formData.email,
          otp: OTP,
        };
        const response = await API.user_seller_mailVerifi(reqObj);

        if (response.data.success === 1) {
          localStorage.setItem("isLoginCheck", true);
          setIsLogin(localStorage.getItem("isLoginCheck"));
          navigate("/user-dashboard");
          localStorage.setItem("_userType", selected);
        } else {
          setOtpError(response.data.msg);
        }
      } catch (error) {}
    }
  };

  // ? RESEND OTP
  const resendOtp = async () => {
    if (selected === "Buyer") {
      try {
        const response = await API.user_buyer_resendOtp(
          localStorage.getItem("__userId")
        );
      } catch (error) {}
    } else {
      try {
        const response = await API.user_seller_resendOtp(
          localStorage.getItem("__userId")
        );
      } catch (error) {}
    }
  };

  //  ? ============ LOGIN START ============
  const loginSubmit = async () => {
    if (selectedLogin === "Buyer") {
      try {
        const reqObj = {
          emailId: loginData.emailId,
          password: loginData.password,
        };
        const response = await API.user_login_buyer(reqObj);
        if (response.data.success === 1) {
          localStorage.setItem("isLoginCheck", true);
          setIsLogin(localStorage.getItem("isLoginCheck"));
          localStorage.setItem("_userType", selectedLogin);
          localStorage.setItem("__userId", response.data.data.id);
          localStorage.setItem("_tokenCode", response.data.token_code);
          const headerObj = {
            Authorization: `Bearer ${response.data.token_code}`,
          };
          localStorage.setItem("_tokenCode", JSON.stringify(headerObj));
          navigate("/user-dashboard");
        } else {
          toast(response.data.msg, {
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
      } catch (error) {}
    } else {
      try {
        const reqObj = {
          emailId: loginData.emailId,
          password: loginData.password,
        };
        const response = await API.user_login_seller(reqObj);
        if (response.data.success === 1) {
          localStorage.setItem("isLoginCheck", true);
          setIsLogin(localStorage.getItem("isLoginCheck"));
          localStorage.setItem("_userType", selectedLogin);
          localStorage.setItem("__userId", response.data.data.id);
          const headerObj = {
            Authorization: `Bearer ${response.data.token_code}`,
          };
          localStorage.setItem("_tokenCode", JSON.stringify(headerObj));
          navigate("/user-dashboard");
        } else {
          toast(response.data.msg, {
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
      } catch (error) {}
    }
  };

  // ? FORGOT EMAIL ======
  const newEmailDataSubmit = async () => {
    if (selectedForgot === "Buyer") {
      try {
        const reqObj = {
          emailId: newEmailData,
        };
        const response = await API.forgot_password_buyer(reqObj);
        if (response.data.success === 1) {
          toast(response.data.message, {
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
          setIsForgot(1);
          localStorage.setItem("__userId", response.data.data.id);
        } else {
          toast(response.data.message, {
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
      } catch (error) {}
    } else {
      try {
        const reqObj = {
          emailId: newEmailData,
        };
        const response = await API.forgot_password_saller(reqObj);
        if (response.data.success === 1) {
          setIsForgot(1);
          localStorage.setItem("__userId", response.data.data.id);
        } else {
          toast(response.data.message, {
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
      } catch (error) {}
    }
  };

  const newEmailDataSubmitOtp = async () => {
    try {
      if (selectedForgot === "Buyer") {
        const reqObj = {
          id: newEmailData,
          otp: OTP,
        };
        const response = await API.user_buyer_mailVerifi(reqObj);

        if (response.data.success === 1) {
          setIsForgot(2);
          setOtpError("");
        } else {
          setOtpError(response.data.msg);
        }
      } else {
        const reqObj = {
          id: newEmailData,
          otp: OTP,
        };
        const response = await API.user_seller_mailVerifi(reqObj);
        if (response.data.success === 1) {
          setIsForgot(2);
        } else {
          setOtpError(response.data.msg);
        }
      }
    } catch (error) {}
  };

  const newPassHandaler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "password":
        setNewPassError("");
        break;
      case "confirmPassword":
        setNewPassErrorCon("");
        break;
      default:
    }
    setPassWordData({ ...passWordData, [name]: value });
  };

  const newPasswordSet = async () => {
    setLoading(true);
    let flag = validatePass();
    if (!flag) {
      setLoading(false);
      return;
    }
    try {
      const reqObj = {
        emailId: newEmailData,
        password: passWordData.password,
        otp: OTP,
      };
      if (selectedForgot === "Buyer") {
        const response = await API.reset_password_buyer(reqObj);

        if (response.data.success === 1) {
          toast(response.data.message, {
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
          closeModal();
          setIsForgot(0);
        }
      } else {
        const response = await API.reset_password_saller(reqObj);

        if (response.data.success === 1) {
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
          setIsForgot(0);
        }
      }
    } catch (error) {}
  };

  const disabelBtnlog =
    !loginData.emailId || !selectedLogin || !loginData.password;

  //VALIDATE-INPUT
  const validate = () => {
    const { email, password, firstName, lastName, confirmPassword, mobileNo } =
      formData;
    let flag = true;

    let validateEmail = appUtils.validateEmail(email);
    if (validateEmail === 1) {
      setErrorEmail({
        field: "email",
        message: "",
      });
    }
    if (!(validateEmail === 1)) {
      let msg = "";
      if (validateEmail === 0) {
        msg = "Please enter your email address.";
      } else {
        msg = "That doesn't look like an email address.";
      }
      setErrorEmail({
        field: "email",
        message: msg,
      });
      flag = false;
    }

    //   Firt name
    let validateName = appUtils.validateName(firstName);
    if (validateName === 1) {
      setErrorName({
        field: "firstName",
        message: "",
      });
    }
    if (!(validateName === 1)) {
      let msg = "";
      if (validateName === 0) {
        msg = "Please enter your first name";
      } else {
        msg = "That doesn't look like a name.";
      }
      setErrorName({
        field: "firstName",
        message: msg,
      });
      flag = false;
    }

    //   Last name
    let validateLastName = appUtils.validateLastName(lastName);
    if (validateLastName === 1) {
      setErrorLastName({
        field: "lastName",
        message: "",
      });
    }
    if (!(validateLastName === 1)) {
      let msg = "";
      if (validateLastName === 0) {
        msg = "Please enter your last name.";
      } else {
        msg = "That doesn't look like a last name.";
      }
      setErrorLastName({
        field: "lastName",
        message: msg,
      });
      flag = false;
    }

    // ? mobile number

    if (mobileNo) {
      if (mobileNo.length < 10) {
        setMobileError({
          field: "mobileNo",
          message: "Please enter valid mobile number",
        });
        flag = false;
      }
      if (mobileNo.length > 10) {
        setMobileError({
          field: "mobileNo",
          message: "",
        });
        flag = true;
      }
    } else {
      setMobileError({
        field: "mobileNo",
        message: "Please enter your mobile number.",
      });
      flag = false;
    }

    // ? password
    if (password) {
      if (password.length < 8) {
        setErrorPassword({
          field: "password",
          message: "Your password is too short. It needs to be 8+ characters",
        });
        flag = false;
      }
      if (password.length > 8) {
        setErrorPassword({
          field: "password",
          message: "",
        });
        flag = true;
      }
    } else {
      setErrorPassword({
        field: "password",
        message: "Confirm password does not match with your password",
      });
      flag = false;
    }

    // ? confirmPassword

    // ? confirmPassword
    if (password === "" || password !== confirmPassword) {
      setConfirmErrorPasword({
        field: "confirmPassword",
        message: "Please confirm your password",
      });
      flag = false;
    } else {
      setConfirmErrorPasword({
        field: "confirmPassword",
        message: "",
      });
      flag = true;
    }

    return flag;
  };

  //VALIDATE-INPUT
  const validatePass = () => {
    const { password, confirmPassword } = passWordData;
    let flag = true;

    // ? password
    if (password) {
      if (password.length < 8) {
        setNewPassError({
          field: "password",
          message: "Your password is too short. It needs to be 8+ characters",
        });
        flag = false;
      }
      if (password.length > 8) {
        setNewPassError({
          field: "password",
          message: "",
        });
        flag = true;
      }
    } else {
      setNewPassError({
        field: "password",
        message: "Please enter your password.",
      });
      flag = false;
    }

    // ? confirmPassword

    // ? confirmPassword
    if (password === "" || password !== confirmPassword) {
      setNewPassErrorCon({
        field: "confirmPassword",
        message: "Confirm password does not match with your password",
      });
      flag = false;
    } else {
      setNewPassErrorCon({
        field: "confirmPassword",
        message: "",
      });
      flag = true;
    }

    return flag;
  };

  const closeModal = () => {
    setIsForgot(0);
    setOpenModal(false);
  };

  const disabelBtn =
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.mobileNo ||
    !formData.password ||
    !formData.confirmPassword ||
    !selected;

  return (
    <>
      <ToastContainer />
      <div className="loginSec">
        <div className={isEmail === 0 ? "main" : "main verification"}>
          {isEmail === 0 ? (
            <>
              {/* <input type="checkbox" id="chk" aria-hidden="true"/> */}
              <div class="signup">
                <label for="chk" aria-hidden="true">
                  Buyer Sign up
                </label>
                <p className="formErrorAlrt">{errorMsg}</p>
                <span>First Name</span>
                <input
                  onChange={handalerChnages}
                  value={formData.firstName}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={errorName ? "mb-0" : ""}
                />
                {errorName.field === "firstName" && (
                  <p className="formErrorAlrt">{errorName.message}</p>
                )}
                <span>Last Name</span>
                <input
                  className={errorLastName ? "mb-0" : ""}
                  onChange={handalerChnages}
                  value={formData.lastName}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required=""
                />
                {errorLastName.field === "lastName" && (
                  <p className="formErrorAlrt">{errorLastName.message}</p>
                )}
                <span>Email id</span>
                <input
                  onChange={handalerChnages}
                  value={formData.email}
                  type="email"
                  className={errorEmail ? "mb-0" : ""}
                  name="email"
                  placeholder="Email"
                  required=""
                />
                {errorEmail.field === "email" && (
                  <p className="formErrorAlrt">{errorEmail.message}</p>
                )}
                <span>Mobile Number</span>
                <div className="mobileNumber mt-2">
                  <select
                    className="mobileCode "
                    onChange={handleCountrySelect}
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
                    onChange={handalerChnages}
                    mask="_"
                    name="mobileNo"
                    value={formData.mobileNo}
                  />
                </div>

                {mobileErrorInner ? (
                  ""
                ) : (
                  <>
                    {mobileError.field === "mobileNo" && (
                      <p className="formErrorAlrt">{mobileError.message}</p>
                    )}
                  </>
                )}

                <p className="formErrorAlrt">{mobileErrorInner}</p>

                {/* {mobileError?(<p className="formErrorAlrt">{mobileError}</p>):("")} */}
                <span>Password</span>
                <input
                  autoFocus={true}
                  autoComplete="off"
                  onChange={handalerChnages}
                  value={formData.password}
                  className={errorPassword ? "mb-0" : ""}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required=""
                />
                {errorPassword.field === "password" && (
                  <p className="formErrorAlrt">{errorPassword.message}</p>
                )}
                <span>Confrim Password</span>
                <input
                  onChange={handalerChnages}
                  value={formData.confirmPassword}
                  className={confirmErrorPasword ? "mb-0" : ""}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confrim Password"
                  required=""
                />

                {confirmErrorPasword.field === "confirmPassword" && (
                  <p className="formErrorAlrt">{confirmErrorPasword.message}</p>
                )}
                <button
                  disabled={loading ? true : false}
                  className="customBtn"
                  onClick={submitHandaler}
                >
                  {loading === false ? (
                    "Sign up"
                  ) : (
                    <ThreeDots
                      height="15"
                      width="100%"
                      radius="9"
                      color="#fff"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                  )}
                </button>
                {/* <button className="customBtn" onClick={submitHandaler}>
                  {loading === false ? "Sign up" : "loader..."}
                </button> */}
                <p className="sectionBtm">
                  Already You Have A Account ?{" "}
                  <Link to="/buyer/login">Login Now</Link>
                </p>
              </div>
              {/* <div class="login">
                          <label for="chk" aria-hidden="true">Login</label>
                          <p className="formErrorAlrt">{errorMsg}</p>
                         <div className="loginCont">
                            <input onChange={loginHandaler} 
                                value={loginData.emailId}
                                type="email" name="emailId"
                                placeholder="Email" required=""/>
                                
                              <input onChange={loginHandaler} 
                                value={loginData.password} 
                                type="password" name="password" 
                                placeholder="Password" required=""/>
                              <button className={disabelBtnlog ? "customBtn disableBtn" : "customBtn"} disabled={disabelBtnlog} onClick={loginSubmit}>Login</button>
                            
                              <Link className="forgotPass" to="#" onClick={() => setOpenModal(true)}>Forgot Password ?</Link>
                         </div>
                      </div> */}
            </>
          ) : (
            <>
              <h3 className="headingSing">Email verification</h3>
              <p className="message">
                Enter the code we just send on your Email
              </p>
              <p className="formErrorAlrt">{otpError}</p>
              <div className="otpInput">
                <OTPInput
                  value={OTP}
                  onChange={setOTP}
                  autoFocus
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                />
              </div>
              <button
                className={
                  OTP.length != 6 ? "customBtn disableBtn" : "customBtn"
                }
                onClick={emaitVerifaction}
                disabled={!OTP}
              >
                Verify OTP
              </button>
              <p className="resend" onClick={resendOtp}>
                Resend OTP
              </p>
            </>
          )}
        </div>
      </div>

      <Modal open={openModal} onClose={closeModal}>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Forgot Password
            </h5>
          </div>
          <div class="modal-body forgot">
            {isForgot === 0 ? (
              <input
                onChange={(e) => setNewEmailData(e.target.value)}
                type="email"
                class="form-control"
                placeholder="Enter email id"
              />
            ) : isForgot === 1 ? (
              <>
                <p className="formErrorAlrt mb-3">{otpError}</p>
                <div className="otpInput">
                  <OTPInput
                    value={OTP}
                    onChange={setOTP}
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    className="forgotOtp"
                  />
                </div>
              </>
            ) : (
              <>
                <input
                  onChange={newPassHandaler}
                  type="password"
                  name="password"
                  value={passWordData.password}
                  class="form-control mb-3"
                  placeholder="Enter password"
                />
                {newPassError.field === "password" && (
                  <p className="formErrorAlrt">{newPassError.message}</p>
                )}
                <input
                  onChange={newPassHandaler}
                  name="confirmPassword"
                  value={passWordData.confirmPassword}
                  type="password"
                  class="form-control"
                  placeholder="Confirm password"
                />
                {newPassErrorCon.field === "confirmPassword" && (
                  <p className="formErrorAlrt">{newPassErrorCon.message}</p>
                )}
              </>
            )}
          </div>
          <div class="modal-footer">
            {isForgot === 0 ? (
              <button
                type="button"
                disabled={!selectedForgot || !newEmailData}
                class="btn btn-primary"
                onClick={newEmailDataSubmit}
              >
                Submit
              </button>
            ) : isForgot === 1 ? (
              <button
                type="button"
                disabled={!OTP}
                class="btn btn-primary"
                onClick={newEmailDataSubmitOtp}
              >
                {" "}
                Verify OTP{" "}
              </button>
            ) : (
              <button
                type="button"
                disabled={
                  !passWordData.password || !passWordData.confirmPassword
                }
                class="btn btn-primary"
                onClick={newPasswordSet}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SignupBuyer;
