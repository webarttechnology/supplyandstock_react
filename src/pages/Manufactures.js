import React, { useEffect, useState } from 'react'
import { IMG } from '../api/constant';
import * as API from "../api/index";
const Manufactures = () => {
    const [menufacData, setMenufacData] = useState([])
    const [checked, setChecked] = useState("");

    //  ? choose handaler
    const coosheHandaler = async (itemId) => {
        setChecked(!checked)
        try {
            const reqObj = {
                id:localStorage.getItem("__userId"),
                manufacturer:itemId
            }
            console.log("reqObj",reqObj);
            if (!checked) {
                const response = await API.choose_manufacturer_saller(reqObj)
                console.log("Choosresponse", response);
            }else{
                const response = await API.remove_manufacturer_saller(reqObj)
                console.log("remresponse", response);
            }
           
        } catch (error) {
            
        }
    }

    // ? MenufactursList
    const MenufactursGet = async () =>{
        try {
            const response = await API.menufactursGet();
            console.log("response", response);
            setMenufacData(response.data.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        MenufactursGet()
    }, [])
    
  return (
    <>
        <div className="manufactures">
            <h4 className="menuHading">Manufactures</h4>
            <div className="row">
                {menufacData.map((item, index)=>(
                    <div className="col-md-4 text-center" key={index}>
                        <div className="menuimgBox">
                            <img src={IMG + item.image} alt="" />
                            <div className="align-items-center d-flex justify-content-evenly">
                                <h4 className="menufecHeading">{item.name}</h4>
                                <input class="form-check-input" 
                                    type="checkbox" value="" 
                                    onChange={()=>coosheHandaler(item._id)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    </>
  )
}

export default Manufactures