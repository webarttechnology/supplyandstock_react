import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import * as API from "../api/index";
import { cuntryData } from '../helpers/commonData';
const initialData = {
  firstName:"",
  lastName:"",
  emailId:"",
  mobileNo:"",
}


const EditProfile = () => {
  const [formData, setFormData] = useState(initialData)
  const [dialCode, setDialCode] = useState("");

  const handleCountrySelect = (e) => {
    setDialCode(e.target.value);
  };

  const handalerChnages = (e) => {
    const { name, value } = e.target;  
    setFormData({ ...formData, [name]: value });
} 


const upDateSubmitBtn = async () => {
  const header = localStorage.getItem("_tokenCode");
  try {
    const reqObj = {
      id:localStorage.getItem("__userId"),
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailId: formData.emailId,
      mobileNo: dialCode + formData.mobileNo,
    }
    console.log("reqObj", reqObj);
    if (localStorage.getItem("_userType") === "Buyer") {
      const response = await API.user_update_buyer(reqObj, header)
      console.log("Buyer", response);
      if (response.data.success === 1) {
        userData_details()
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
      const response = await API.user_update_buyer(reqObj, header)
      console.log("sellerUp", response);
      if (response.data.success === 1) {
        userData_details()
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

  const userData_details = async () =>{
    const header = localStorage.getItem("_tokenCode");
    try {
      if (localStorage.getItem("_userType") === "Buyer") {
        const BuyerResponse = await API.manufacturer_buyer(localStorage.getItem("__userId"), header)
        console.log("BuyerResponse", BuyerResponse);
        setFormData(BuyerResponse.data.data)
      }else{
        const sellerResponse = await API.manufacturer_saller(localStorage.getItem("__userId"), header)
        console.log("sellerResponse", sellerResponse);
        setFormData(sellerResponse.data.data)
      }
      
    } catch (error) {
      
    }
  }
  

    useEffect(() => {
      userData_details()
    }, [])
    

  return (
    <>
      <div className="row mb-4">
          <div className="col-md-6">
              <label for="exampleFormControlInput1" class="form-label">First Name</label>
              <input type="text" class="form-control"
                onChange={handalerChnages} 
                value={formData.firstName} 
                type="text" name="firstName" 
              placeholder="First Name" />
          </div>
          <div className="col-md-6">
              <label for="exampleFormControlInput1" class="form-label">Last Name</label>
              <input class="form-control" 
                onChange={handalerChnages} value={formData.lastName}
                type="text" name="lastName"
              placeholder="Last Name" />
          </div>
      </div>
      <div className="row mb-4">
          <div className="col-md-6">
              <label for="exampleFormControlInput1" class="form-label">Email Adderss</label>
              <input type="email" class="form-control" onChange={handalerChnages} value={formData.emailId} readOnly placeholder="name@example.com" />
          </div>
          <div className="col-md-6">
            <label for="exampleFormControlInput1" class="form-label">Mobile Number</label>
            <div className="mobileNumber editPro mt-2">
                <select className="mobileCode " onChange={handleCountrySelect}>
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
          </div>
      </div>
      <div className="justify-content-center mb-4 row">
          <div className="col-md-4">
              <span class="bannerBtn text-center w-100" onClick={upDateSubmitBtn}>Update</span>
          </div>
      </div>
    </>
  )
}

export default EditProfile