import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import * as API from "../api/index";
const EnquiryList = () => {
    const [allEnqris, setAllEnqris] = useState([])
    const allEnquery = async () =>{
        const header = localStorage.getItem("_tokenCode");
        try {
           const response = await API.buyer_enqueris_id(localStorage.getItem("__userId"), header) 
           console.log("EnquiryListREs", response);
           setAllEnqris(response.data.data)
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
                    <th scope="col">Manufacturer</th>
                    <th scope="col">Quantities</th>
                    <th scope="col">Size</th>
                    <th scope="col">Product details</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {allEnqris.map((item, index)=>(
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.manufacturer.name}</td>
                        <td>{item.quantities}</td>
                        <td>{item.size}</td>
                        <td>{item.product_des}</td>
                        <td><i class="bi bi-chat-left-dots-fill chatIcon"></i></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default EnquiryList