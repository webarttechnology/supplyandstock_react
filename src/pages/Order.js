import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as API from "../api/index";
const Order = () => {
  const [allEnqris, setAllEnqris] = useState([])
  
  const allEnquery = async () =>{
    const header = localStorage.getItem("_tokenCode");
    try {
        if (localStorage.getItem("_userType") === "Buyer") {
            const response = await API.buyer_enqueris_id(localStorage.getItem("__userId"), header) 
            console.log("EnquiryListREs", response);
            setAllEnqris(response.data.data)
        }else{
            const response = await API.seller_enqueris_id(localStorage.getItem("__userId"), header) 
            console.log("EnquiryListREsSeller", response);
            setAllEnqris(response.data.data)
        }
       
    } catch (error) {
        
    }
}


useEffect(() => {
  allEnquery()
}, [])



  return (
    <>
        <table class="table table-darks ">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date of Purchase</th>
                    <th scope="col">Manufacturer</th>
                    <th scope="col">Payment Status</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    </>
  )
}

export default Order