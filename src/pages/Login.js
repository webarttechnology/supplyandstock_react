import React, { useState } from 'react'
import * as appUtils from "../helpers/appUtils";
import { Link } from 'react-router-dom'
const initialData = {
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    password:"",
    confrimPassword:"",
}
const Login = () => {
const [formData, setFormData] = useState(initialData)
const [isSubmit, setIsSubmit] = useState(0)

//ERROR-MSGS
const [errorMsg, setErrorMsg] = useState("");
const [errorEmail, setErrorEmail] = useState("");
const [errorName, setErrorName] = useState("");
const [errorLastName, setErrorLastName] = useState("");
const [errorPassword, setErrorPassword] = useState("");
const [confirmErrorPasword, setConfirmErrorPasword] = useState("");


const handalerChnages = (e) => {
    const { name, value } = e.target;  
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
        default:
      }
    setFormData({ ...formData, [name]: value });
} 
// ?=========== submit handaler ============
const submitHandaler = async () => {
    setIsSubmit(1)
    try {
        const reqObj = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            confrimPassword: formData.confrimPassword,  
        }
        console.log("reqObj", reqObj);

    } catch (error) {
        
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
    !formData.email || !formData.phone || !formData.password || !formData.confrimPassword ;



  return (
    <>
        <div className="loginSec">
            <div class="main">  	
                <input type="checkbox" id="chk" aria-hidden="true"/>
                <div class="signup">
                    <label for="chk" aria-hidden="true">Sign up</label>
                    <input onChange={handalerChnages} value={formData.firstName} type="text" name="firstName" placeholder="First Name" required="" />
                    <input onChange={handalerChnages} value={formData.lastName} type="text" name="lastName" placeholder="Last Name" required="" />
                    <input onChange={handalerChnages} value={formData.email} type="email" name="email" placeholder="Email" required="" />
                    <input onChange={handalerChnages} value={formData.phone} type="text" name="phone" placeholder="Phone number" required="" />
                    <input onChange={handalerChnages} value={formData.password} type="password" name="password" placeholder="Password" required="" />
                    <input onChange={handalerChnages} value={formData.confrimPassword} type="password" name="confrimPassword" placeholder="Confrim Password" required="" />
                    <button  className={disabelBtn ? "customBtn disableBtn" : "customBtn"}  onClick={submitHandaler} disabled={disabelBtn}>
                        {isSubmit === 0 ? "Sign up" : "loader..."}    
                    </button>
                </div>
                <div class="login">
                    <label for="chk" aria-hidden="true">Login</label>
                    <input type="email" name="email" placeholder="Email" required=""/>
                    <input type="password" name="pswd" placeholder="Password" required=""/>
                    <button className="customBtn">Login</button>
                    <Link className="forgotPass" to="/">Forgot Password ?</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login