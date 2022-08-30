import React, { useState } from 'react'
import { toast } from 'react-toastify';
import * as API from "../api/index";
const initialDatalogPass = {
    password:"",
    confirmPassword:""
  }
const ChangesPassword = () => {
const [passWordData, setPassWordData] = useState(initialDatalogPass)
const [newPassError, setNewPassError] = useState("")
const [newPassErrorCon, setNewPassErrorCon] = useState("")


const upDateSubmitBtn = async () => {
    let flag = validatePass();
    if (!flag) {
        return;
      }
    const header = localStorage.getItem("_tokenCode");
    try {
        const reqObj = {
            id:localStorage.getItem("__userId"),
            password:passWordData.password
        }
        console.log("reqObj", reqObj);
        if (localStorage.getItem("_userType") === "Buyer") {
            const response = await API.changesPassword_buyer(reqObj, header)
            console.log("buyresponse", response);
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
            }
        }else{
            const response = await API.changesPassword_seller(reqObj, header)
            console.log("Sssresponse", response);
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
            }
        }
    } catch (error) {
        
    }
}


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
  }

   //VALIDATE-INPUT
const validatePass = () => {
    const {password, confirmPassword } =
      passWordData;
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
  

  return (
    <>
        <div className="row mb-4">
            <h4 className="menuHading">Changes Password</h4>
          <div className="col-md-6">
             <label for="exampleFormControlInput1" class="form-label">Password </label>
                <input onChange={newPassHandaler} type="password" name="password" value={passWordData.password} class="form-control mb-3" placeholder="Enter password" />
                {newPassError.field === "password" && (
                    <p className="formErrorAlrt">{newPassError.message}</p>
                 )}
          </div>
          <div className="col-md-6">
              <label for="exampleFormControlInput1" class="form-label"> Confirm Password</label>
              <input onChange={newPassHandaler} name="confirmPassword" value={passWordData.confirmPassword} type="password"
                class="form-control" placeholder="Confirm password" />
                {newPassErrorCon.field === "confirmPassword" && (
                    <p className="formErrorAlrt mt-3">{newPassErrorCon.message}</p>
                )}
          </div>
        </div>
        <div className="justify-content-center mb-4 row">
          <div className="col-md-4">
              <span class="bannerBtn text-center w-100" onClick={upDateSubmitBtn}>Changes</span>
          </div>
      </div>
    </>
  )
}

export default ChangesPassword