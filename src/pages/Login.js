import React, { useState } from 'react'
import * as appUtils from "../helpers/appUtils";
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import * as API from "../api/index";
import OTPInput from "otp-input-react";
import { cuntryData } from '../helpers/commonData';
const initialData = {
    firstName:"",
    lastName:"",
    email:"",
    mobileNo:"",
    password:"",
    confirmPassword:"",
}
const Login = () => {
const [formData, setFormData] = useState(initialData)
const [loading, setLoading] = useState(false);
const [dialCode, setDialCode] = useState("");
const [isEmail, setIsEmail] = useState(0)
const [OTP, setOTP] = useState("");
const [otpVelue, setOtpVelue] = useState("")


//ERROR-MSGS
const [errorMsg, setErrorMsg] = useState("");
const [errorEmail, setErrorEmail] = useState("");
const [errorName, setErrorName] = useState("");
const [errorLastName, setErrorLastName] = useState("");
const [errorPassword, setErrorPassword] = useState("");
const [confirmErrorPasword, setConfirmErrorPasword] = useState("");
const [mobileError, setMobileError] = useState("")
const [selected, setSelected] = useState("");
const [otpError, setOtpError] = useState("")

const handalerChnages = (e) => {
    const { name, value } = e.target;  
    setLoading(false)
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
        case "password":
          setErrorPassword("");
          break;
        case "confirmPassword":
          setConfirmErrorPasword("");
          break;
        case "mobileNo":
          setMobileError("");
          break;
        default:
      }
    setFormData({ ...formData, [name]: value });
} 

const handleChange = event => {
  console.log(event.target.value);
  setSelected(event.target.value);
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
        if (formData.mobileNo.length === 10) {
            try {
              const reqObj = {
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  emailId: formData.email,
                  mobileNo: dialCode + formData.mobileNo,
                  password: formData.password,  
              }
              console.log("bbbreqObj", reqObj);
              const response = await API.user_registration_buyer(reqObj)
              console.log("response", response);
              if (response.data.success === 1) {
                setLoading(false)
                setIsEmail(1)
                localStorage.setItem("__userId", response.data.data._id)
                setOtpVelue(response.data.data.otp)
              }else{
                setErrorMsg(response.data.msg)
                setLoading(false)
              }
          } catch (error) {
              
          }
        }else{
          setMobileError("Please enter valid mobile number")
        }
    }else{
        if (formData.mobileNo.length === 10) {
          try {
            const reqObj = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                emailId: formData.email,
                mobileNo: dialCode + formData.mobileNo,
                password: formData.password,  
            }
            console.log("sssreqObj", reqObj);
            const response = await API.user_registration_seller(reqObj)
            console.log("sssreqObj", response);
            if (response.data.success ===1) {
              setLoading(false)
              setIsEmail(1)
              localStorage.setItem("__userId", response.data.data._id)
              setOtpVelue(response.data.data.otp)
            }else{
              setErrorMsg(response.data.msg)
              setLoading(false)
            }
            
        } catch (error) {
            
        }
      }else{
        setMobileError("Please enter valid mobile number")
      }
    }

    
    
}

// ? EMAIL OTP VERIFACTION 
const emaitVerifaction = async () =>{
  if (selected === "Buyer") {
    try {
      const reqObj = {
        id: localStorage.getItem("__userId"),
        otp: otpVelue,
      }
      const response = await API.user_buyer_mailVerifi(reqObj)
      console.log("buyerresponse", response);
      if (response.data.success === 1) {
        // setOtpError()
      }else{
        setOtpError(response.data.msg)
      }
    } catch (error) {
      
    }
  }else{
    try {
      const reqObj = {
        id: localStorage.getItem("__userId"),
        otp: otpVelue,
      }
      const response = await API.user_seller_mailVerifi(reqObj)
      console.log("sellerresponse", response);
    } catch (error) {
      
    }
  }
  
}

// ? RESEND OTP 
const resendOtp = async() =>{
  if (selected === "Buyer") {
    try {
      const response = await API.user_buyer_resendOtp(localStorage.getItem("__userId"))
      console.log("bbresponse", response);
    } catch (error) {
      
    }
  }else{
    try {
      const response = await API.user_seller_resendOtp(localStorage.getItem("__userId"))
      console.log("SSSresponse", response);
    } catch (error) {
      
    }
  }
  
}



//VALIDATE-INPUT
const validate = () => {
    const { email, password, firstName, lastName, confirmPassword } =
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
        message: "Please enter your password.",
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

  const disabelBtn = !formData.firstName || !formData.lastName || 
    !formData.email || !formData.mobileNo || !formData.password || !formData.confirmPassword || !selected;



  return (
    <>
        <div className="loginSec">
            <div className={isEmail === 0 ? "main": "main verification"}>
                {isEmail === 0 ? (
                  <>
                    <input type="checkbox" id="chk" aria-hidden="true"/>
                      <div class="signup">
                          <label for="chk" aria-hidden="true">Sign up</label>
                          <p className="formErrorAlrt">{errorMsg}</p>
                          <div className="userType">
                            <input
                                type="radio"
                                id="Buyer"
                                name="choose"
                                value="Buyer"
                                checked={selected === 'Buyer'}
                                onChange={handleChange}
                                className="redioBtn"
                              />
                              <label htmlFor="Buyer">Buyer</label>

                              <input
                                type="radio"
                                id="Seller"
                                name="choose"
                                value="Seller"
                                onChange={handleChange}
                                checked={selected === 'Seller'}
                                className="redioBtn"
                              />
                              <label htmlFor="Seller">Seller</label>
                          </div>
                          <input 
                              onChange={handalerChnages} 
                              value={formData.firstName} 
                              type="text" name="firstName" 
                              placeholder="First Name" 
                              required="" 
                          />
                          {errorName.field === "firstName" && (
                              <p className="formErrorAlrt">{errorName.message}</p>
                          )}
                          <input onChange={handalerChnages} value={formData.lastName} type="text" name="lastName" placeholder="Last Name" required="" />
                          <input onChange={handalerChnages} value={formData.email} type="email" className={errorEmail ? "mb-2" :"" } name="email" placeholder="Email" required="" />
                          {errorEmail.field === "email" && (
                            <p className="formErrorAlrt">{errorEmail.message}</p>
                          )}

                          <div className="mobileNumber">
                              <select className="mobileCode" onChange={handleCountrySelect}>
                                  {cuntryData.map((item, index) => (
                                    <>
                                      <option
                                          name="category"
                                          key={item.name}
                                          value={item.dial_code}
                                        >
                                          {item.code + item.dial_code}
                                        </option>
                                    </>
                                  ))}
                                </select>
                              <input className="mobileNumberF" onChange={handalerChnages} 
                                value={formData.mobileNo} 
                                max={10}
                                type="number" name="mobileNo" placeholder="Phone number" />
                          </div>
                          {mobileError?(<p className="formErrorAlrt">{mobileError}</p>):("")}
                          
                          <input 
                            onChange={handalerChnages} value={formData.password}
                            className={errorPassword ? "mb-0" :"" } 
                            type="password" name="password" 
                            placeholder="Password" required="" />
                          {errorPassword.field === "password" && (
                            <p className="formErrorAlrt">{errorPassword.message}</p>
                          )}

                          <input onChange={handalerChnages} value={formData.confirmPassword} 
                          className={confirmErrorPasword ? "mb-0" :"" }  type="password" 
                          name="confirmPassword" placeholder="Confrim Password" required="" />

                          {confirmErrorPasword.field === "confirmPassword" && (
                            <p className="formErrorAlrt">{confirmErrorPasword.message}</p>
                          )}

                          <button  className={disabelBtn ? "customBtn disableBtn" : "customBtn"}  onClick={submitHandaler} disabled={disabelBtn}>
                              {loading === false ? "Sign up" : "loader..."}    
                          </button>
                      </div>
                      <div class="login">
                          <label for="chk" aria-hidden="true">Login</label>
                          <input type="email" name="email" placeholder="Email" required=""/>
                          <input type="password" name="pswd" placeholder="Password" required=""/>
                          <button className="customBtn">Login</button>
                          <Link className="forgotPass" to="/">Forgot Password ?</Link>
                      </div>
                  </>
                ):(
                  <>
                    <h3 className="headingSing">Email verification</h3>
                    <p className="message">Enter the code we just send on your Email</p>
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
                    <button  className={OTP.length != 6 ? "customBtn disableBtn" : "customBtn"}  onClick={emaitVerifaction} disabled={!OTP}>
                      Verify OTP   
                    </button>
                    <p className="resend" onClick={resendOtp}>Resend OTP</p>
                  </>
                )}	
                
            </div>
        </div>
    </>
  )
}

export default Login