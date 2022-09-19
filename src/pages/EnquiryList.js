import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as API from "../api/index";
const EnquiryList = () => {
    const [allEnqris, setAllEnqris] = useState([])
    console.log("allEnqris", allEnqris);

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

    const sellerAccept = async (enqrId) => {
        console.log("enqrId", enqrId);
        const header = localStorage.getItem("_tokenCode");
        try {
            const reqObj = {
                userId: localStorage.getItem("__userId"),
                id: enqrId,
            }
            const response = await API.enquriys_accepts(reqObj, header);
            if (response.data.success === 200) {
                allEnquery()
            }
            console.log("response", response);
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
                    {localStorage.getItem("_userType") === "Buyer" ? (
                        <>
                            <th scope="col">#</th>
                            <th scope="col">Manufacturer</th>
                            <th scope="col">Quantities</th>
                            <th scope="col">Size</th>
                            <th scope="col">Product details</th>
                            <th scope="col">Action</th>
                        </>
                    ):(
                        <>
                            <th scope="col">#</th>
                            <th scope="col">Product details</th>
                            <th scope="col">Quantities</th>
                            <th scope="col">Size</th>
                            <th scope="col">Action</th>
                        </>
                    )}
                    
                </tr>
            </thead>
            <tbody>
                {localStorage.getItem("_userType") === "Buyer" ? (
                    <>
                        {allEnqris.map((item, index)=>(
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.manufacturer.name}</td>
                                <td>{item.quantities}</td>
                                <td>{item.size}</td>
                                <td>{item.product_des}</td>
                                <td>
                                    {item.isActive === "1" ? (
                                        <Link to="/message" state={{ data: "occupation" }} className='btn btn-info me-2'> 
                                            <i class="bi bi-chat-left-dots-fill chatIcon"></i> 
                                        </Link>
                                    ):(
                                        <button className='btn btn-primary me-2' onClick={()=> sellerAccept(item._id)}> Accept</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </>
                ) :(
                    <>
                        {allEnqris.map((item, index)=>(
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.enquiry.product_des}</td>
                                <td>{item.enquiry.quantities}</td>
                                <td>{item.enquiry.size}</td>
                                <td>
                                    {item.isActive === "1" ? (
                                        <Link to="/message" state={{ data: "occupation" }} className='btn btn-info me-2'> 
                                            <i class="bi bi-chat-left-dots-fill chatIcon"></i> 
                                        </Link>
                                    ):(
                                        <button className='btn btn-primary me-2' onClick={()=>sellerAccept (item.enquiryId)}> Accept</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </>
                )}
                
            </tbody>
        </table>
    </>
  )
}

export default EnquiryList