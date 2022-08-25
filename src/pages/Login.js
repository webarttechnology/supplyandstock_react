import React, { useState } from 'react'
import * as appUtils from "../helpers/appUtils";
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import * as API from "../api/index";
import OTPInput from "otp-input-react";
import { useNavigate } from "react-router";
import { cuntryData } from '../helpers/commonData';
const initialData = {
    firstName:"",
    lastName:"",
    email:"",
    mobileNo:"",
    password:"",
    confirmPassword:"",
}
const initialDatalog = {
  emailId:"",
  password:"",
}

const Login = () => {

const navigate = useNavigate();

const [formData, setFormData] = useState(initialData)
const [loading, setLoading] = useState(false);
const [dialCode, setDialCode] = useState("");
const [isEmail, setIsEmail] = useState(0)
const [OTP, setOTP] = useState("");
const [loginData, setLoginData] = useState(initialDatalog)
const [newEmailData, setNewEmailData] = useState("")
const [isForgot, setIsForgot] = useState(0)
const [passWordData, setPassWordData] = useState("")
const [conpassWordData, setConPassWordData] = useState("")



//ERROR-MSGS
const [errorMsg, setErrorMsg] = useState("");
const [errorEmail, setErrorEmail] = useState("");
const [errorName, setErrorName] = useState("");
const [errorLastName, setErrorLastName] = useState("");
const [errorPassword, setErrorPassword] = useState("");
const [confirmErrorPasword, setConfirmErrorPasword] = useState("");
const [mobileError, setMobileError] = useState("")
const [selected, setSelected] = useState("");
const [selectedLogin, setSelectedLogin] = useState("");
const [selectedForgot, setSelectedForgot] = useState("");
const [otpError, setOtpError] = useState("")
const [newPassError, setNewPassError] = useState("")

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

// ? login handaler
const loginHandaler = (e) => {
  const { name, value } = e.target; 
  setLoginData({ ...loginData, [name]: value });
}
// ? sign up
const handleChange = event => {
  console.log(event.target.value);
  setSelected(event.target.value);
};

// ? login type
const handleChangeLogin = event => {
  console.log(event.target.value);
  setSelectedLogin(event.target.value);
};
// ? login type
const handleChangeforgot = event => {
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
        otp: OTP,
      }
      console.log("reqObj", reqObj);
      const response = await API.user_buyer_mailVerifi(reqObj)
      console.log("buyerresponse", response);
      if (response.data.success === 1) {
        navigate("/user-dashboard")
      }else{
        setOtpError(response.data.msg)
      }
    } catch (error) {
      
    }
  }else{
    try {
      const reqObj = {
        id: localStorage.getItem("__userId"),
        otp: OTP,
      }
      const response = await API.user_seller_mailVerifi(reqObj)
      console.log("sellerresponse", response);
      if (response.data.success === 1) {
        navigate("/user-dashboard")
      }else{
        setOtpError(response.data.msg)
      }
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

//  ? ============ LOGIN START ============
const loginSubmit = async ()=>{
  if (selectedLogin === "Buyer") {
    try {
      const reqObj = {
        emailId: loginData.emailId,
        password: loginData.password,
      }
      console.log("bbbreqObj", reqObj);
      const response = await API.user_login_buyer(reqObj)
      console.log("bbbresponse", response);
      if (response.data.success === 1) {
        localStorage.setItem("__userId", response.data.data.id)
        localStorage.setItem("_tokenCode", response.data.token_code)
        navigate("/user-dashboard")
      }else{
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
    } catch (error) {
      
    }
  }else{
    try {
      const reqObj = {
        emailId: loginData.emailId,
        password: loginData.password,
      }
      console.log("ssreqObj", reqObj);
      const response = await API.user_login_seller(reqObj)
      console.log("sssresponse",response);
      if (response.data.success === 1) {
        localStorage.setItem("__userId", response.data.data.id)
        localStorage.setItem("_tokenCode", response.data.token_code)
        navigate("/user-dashboard")
      }else{
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
    } catch (error) {
      
    }
  }
 
}

// ? FORGOT EMAIL ======
const newEmailDataSubmit = async () => {
  if (selectedForgot === 'Buyer') {
      try {
        const reqObj = {
          emailId: newEmailData,
        }
        console.log("reqObj", reqObj);
        const response = await API.forgot_password_buyer(reqObj)
        console.log("response",response);
        if (response.data.success) {
          setIsForgot(1)
        }else{
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
      } catch (error) {
        
      }
  }else{
    try {
      const reqObj = {
        emailId: newEmailData,
      }
      console.log("reqObj", reqObj);
      const response = await API.forgot_password_saller(reqObj)
      console.log("response",response);
      if (response.data.success) {
        setIsForgot(1)
      }else{
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
    } catch (error) {
      
    }
  }
  
}


const newEmailDataSubmitOtp = async () => {
  try {
    if (selectedForgot === "Buyer") {
      const reqObj = {
        id: localStorage.getItem("__userId"),
        otp: OTP,
      }
      const response = await API.user_buyer_mailVerifi(reqObj)
      console.log("bbbresponse", response);
      if (response.data.success === 1) {
        setIsForgot(2)
        setOtpError("")
      }else{
        setOtpError(response.data.msg)
      }
    }else{
      const reqObj = {
        id: localStorage.getItem("__userId"),
        otp: OTP,
      }
      const response = await API.user_seller_mailVerifi(reqObj)
      if (response.data.success === 1) {
        setIsForgot(2)
      }else{
        setOtpError(response.data.msg)
      }
      console.log("ssbresponse", response);
    }
   
  } catch (error) {
    
  }
}

const newPasswordSet = async () =>{
  if (selectedForgot === "Buyer") {
    if (passWordData.length < 8 ) {
      setNewPassError("Your password is too short. It needs to be 8+ characters")
      if (passWordData === conpassWordData) {
        const reqObj = {
            emailId: newEmailData,
            password: passWordData, 
            otp: OTP
          }
          console.log("bbreqObj", reqObj);
        }
    }else{
      setConfirmErrorPasword("Please confirm your password")
    }
  }else{
    if (passWordData.length < 8 ) {
      setNewPassError("Your password is too short. It needs to be 8+ characters")
      if (passWordData === conpassWordData) {
        const reqObj = {
            emailId: newEmailData,
            password: passWordData, 
            otp: OTP
          }
          console.log("bbreqObj", reqObj);
        }
    }else{
      setConfirmErrorPasword("Please confirm your password")
    }
  }
}

const disabelBtnlog = !loginData.emailId || !selectedLogin || !loginData.password;

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
     <ToastContainer />
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
                                        <option>choose</option>
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
                          <p className="formErrorAlrt">{errorMsg}</p>
                          <div className="userType">
                            <input
                                type="radio"
                                id="Buyer"
                                name="choose"
                                value="Buyer"
                                checked={selectedLogin === 'Buyer'}
                                onChange={handleChangeLogin}
                                className="redioBtn"
                              />
                              <label htmlFor="Buyer">Buyer</label>

                              <input
                                type="radio"
                                id="Seller"
                                name="choose"
                                value="Seller"
                                onChange={handleChangeLogin}
                                checked={selectedLogin === 'Seller'}
                                className="redioBtn"
                              />
                              <label htmlFor="Seller">Seller</label>
                          </div>
                          <input onChange={loginHandaler} 
                            value={loginData.emailId}
                            type="email" name="emailId"
                            placeholder="Email" required=""/>
                            
                          <input onChange={loginHandaler} 
                            value={loginData.password} 
                            type="password" name="password" 
                            placeholder="Password" required=""/>
                          <button className={disabelBtnlog ? "customBtn disableBtn" : "customBtn"} disabled={disabelBtnlog} onClick={loginSubmit}>Login</button>
                         
                          <Link className="forgotPass" to="/" data-bs-toggle="modal" data-bs-target="#exampleModal">Forgot Password ?</Link>
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

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Forgot Password</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body forgot">
             {isForgot === 0 ?(
               <div className="userType mb-3">
               <input
                   type="radio"
                   id="Buyer"
                   name="choose"
                   value="Buyer"
                   checked={selectedForgot === 'Buyer'}
                   onChange={handleChangeforgot}
                   className="redioBtn"
                 />
                 <label htmlFor="Buyer">Buyer</label>
                   
                 <input
                   type="radio"
                   id="Seller"
                   name="choose"
                   value="Seller"
                   onChange={handleChangeforgot}
                   checked={selectedForgot === 'Seller'}
                   className="redioBtn"
                 />
                 <label htmlFor="Seller">Seller</label>
             </div>
             ):("")}
            
                {isForgot === 0 ?(
                  <input onChange={(e)=> setNewEmailData(e.target.value)} type="email" class="form-control" placeholder="Enter email id" />
                ): isForgot === 1 ? (
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
                ):(
                  <>
                    <input onChange={(e)=> setPassWordData(e.target.value)} type="password" class="form-control mb-3" placeholder="Enter password" />
                      <p className="formErrorAlrt mb-3">{newPassError}</p>
                    <input onChange={(e)=> setConPassWordData(e.target.value)} type="password"
                     class="form-control" placeholder="Confirm password" />
                      <p className="formErrorAlrt mb-3">{confirmErrorPasword}</p>
                  </>
                )}
                
            </div>
            <div class="modal-footer">
              {isForgot === 0 ? (<button type="button" disabled={!selectedForgot || !newEmailData} 
              class="btn btn-primary" onClick={newEmailDataSubmit}>Submit</button>):
              isForgot === 1 ? (
              <button type="button" disabled={!selectedForgot ||
               !newEmailData} class="btn btn-primary" onClick={newEmailDataSubmitOtp}> Verify OTP </button>
               ):(
               <button type="button" disabled={!passWordData || !conpassWordData} class="btn btn-primary" 
               onClick={newPasswordSet}>Submit</button>
               )}
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login