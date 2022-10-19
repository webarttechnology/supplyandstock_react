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
            const response = await API.user_order(localStorage.getItem("__userId"), header) 
            console.log("orderbb", response);
            setAllEnqris(response.data.data)
        }else{
            const response = await API.user_order_seller(localStorage.getItem("__userId"), header) 
            console.log("order", response);
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
      <div class="table-responsive">
          <table class="table table-darks mb-0">
            <thead>
              <tr>
                <th>No.</th>
                {localStorage.getItem("_userType") === "Buyer" ? (<th>Seller Details</th>):(<th>Buyer Details</th>) }
            
                <th>Enquiry</th>
              </tr>
            </thead>
            <tbody>
              {allEnqris.map((item, index)=> (
                <tr key={index}>
                  <td class="text-bold-500">{index + 1}</td>
                  {localStorage.getItem("_userType") === "Buyer" ? (
                    <td class="text-bold-500">{item.seller[0].firstName +' '+ item.seller[0].lastName} </td>
                  ):(
                    <td class="text-bold-500">{item.buyer[0].firstName +' '+ item.buyer[0].lastName} </td>
                  ) }
                  
                  
                  <td>
                      <ul className='ps-0'>
                        <li><strong>Product name : </strong> {item.productName}</li>
                        <li><strong>Quantities : </strong> {item.quantities}</li>
                        <li><strong>Final amount : </strong> {item.finalAmount}</li>
                      </ul>
                  </td>
                  {/* <td>
                    <div class="buttons">
                      <span onClick={() => openModalSellar(item._id)} class="btn icon btn-primary">
                        <i class="bi bi-pencil"></i>
                      </span>
                      <button onClick={()=> menufactheDelete(item._id)} class="btn icon btn-danger">
                        <i class="bi bi-x"></i>
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  )
}

export default Order