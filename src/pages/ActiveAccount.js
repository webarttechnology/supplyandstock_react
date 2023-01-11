import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as API from "../api/index";
import Individual from '../components/Individual';
const ActiveAccount = ({userEmail}) => {
    const [businessTypes, setBusinessTypes] = useState("")
    const [activeAccount, setActiveAccount] = useState(false)
    const [stripAcc, setStripAcc] = useState("")

    const userDetails = async () =>{
        const header = localStorage.getItem("_tokenCode");
        try {
            const sellerResponse = await API.manufacturer_saller(
                localStorage.getItem("__userId"),
                header
            );
            console.log("sellerResponsesss", sellerResponse);
            if (sellerResponse.data.data.strip_acc) {
                setActiveAccount(true)
                setStripAcc(sellerResponse.data.data.strip_acc)
              }
        } catch (error) {
            
        }
    }

   
   const businessType = (e) =>{
        setBusinessTypes(e.target.value)
        console.log("e", e.target.value);
   }

   useEffect(() => {
    userDetails()
   }, [])
   
  return (
    <>
        <div className='activeAcount'>
           <div className='container px-0'>
                <div className='align-items-center justify-content-center row'>
                    <div className='col-md-12 text-center'>
                        {activeAccount ? (
                            <>
                                <h2 className='accountHead'>Stripe Account Number</h2>
                                <div className='align-items-center d-flex flex-column justify-content-evenly mt-4'>
                                    <span className='stripAc'>{stripAcc}</span>
                                    <span className='checkAcount mt-2'>
                                        <i class="bi bi-check-circle"></i>
                                    </span>
                                </div>
                            </>
                        ):(
                            <>
                                <h3 className='menuHading'>Below information is solely used to create a stripe account on your behalf and no data will be stored in our application</h3>
                                <div className='row justify-content-center'>
                                    <div className='col-md-7'>
                                        <label>Choose business type</label>
                                        <select onChange={businessType} className='form-control mb-2'>
                                            <option>--- Select business type ---</option>
                                            <option value="company">Company</option>
                                            <option value="individual">Individual</option>
                                            <option value="non-profit">Non-profit</option>
                                            <option value="government-entity">Government entity</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {activeAccount ? (""):(
                    <>
                        {businessTypes === "company" ? ("company"): 
                            businessTypes === "individual" ? (
                                <Individual userDetails={userDetails} businessTypes={businessTypes} 
                                userEmail={userEmail} />
                            ): 
                            businessTypes === "non-profit" ? ("non-profit") : 
                            businessTypes === "government-entity" ? 
                            ("government-entity"):("") 
                        }
                    </>
                )}
                
           </div>
        </div>
    </>
  )
}

export default ActiveAccount