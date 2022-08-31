import React, { useEffect, useState } from 'react'
import { IMG } from '../api/constant';
import * as API from "../api/index";
const Enquiry = () => {

    const [menufacData, setMenufacData] = useState([])


   // ? MenufactursList
   const MenufactursGet = async () =>{
    const header = localStorage.getItem("_tokenCode");
    try {
        const response = await API.menufactursGet(header);
        setMenufacData(response.data.data)
        console.log("response", response);
        
    } catch (error) {
        
    }
}

const upDateSubmitBtn = async () =>{
    try {
        
    } catch (error) {
        
    }
}

useEffect(() => {
    MenufactursGet()
}, [])

  return (
    <>
        <div className="userDashboard">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="bannerSec">
                            <h1 className="text-center mb-4">Enquiry Form</h1>
                            <label className="enqLable">Manufacturer </label>
                            <select className="form-control">
                                <option>--- Select ---</option>
                                {menufacData.map((item, index)=>(
                                    <option value={item.id}>
                                        <div className="titleDetails">
                                            <span>{item.name}</span>
                                            <img src={IMG + item.image} />
                                        </div>
                                    </option>
                                ))}
                            </select>
                            <label className="enqLable">Quantities </label>
                            <input placeholder="Enter quantities" type="text" className="form-control" />
                            <label className="enqLable"> Size </label>
                            <input placeholder="Enter size" type="text" className="form-control" />
                            <label className="enqLable"> Product details </label>
                            <textarea className="form-control" 
                                placeholder="Enter product details" rows="5" cols="5">
                            </textarea>
                            <div className="justify-content-center mt-4 row">
                                <div className="col-md-4">
                                    <span class="bannerBtn text-center w-100" onClick={upDateSubmitBtn}>Submit</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Enquiry