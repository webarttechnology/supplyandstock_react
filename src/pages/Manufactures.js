import React, { useEffect, useState } from 'react'
import { IMG } from '../api/constant';
import * as API from "../api/index";
import { Vortex } from 'react-loader-spinner'
const Manufactures = () => {
    const [menufacData, setMenufacData] = useState([])
    const [checked, setChecked] = useState("");
    const [menuFacId, setMenuFacId] = useState([])
    const [loader, setLoader] = useState(false)
    const [menuId, setMenuId] = useState('')
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    //  ? choose handaler
    const coosheHandaler = async (itemId) => {
       
        setChecked(!checked)
        setMenuId(itemId)
        setLoader(true)
        
        try {
            const reqObj = {
                id:localStorage.getItem("__userId"),
                manufacturer:itemId
            }
            console.log("reqObj",reqObj);
            if (!checked) {
                const response = await API.choose_manufacturer_saller(reqObj)
                console.log("Choosresponse", response);
                if (response.data.success) {
                    MenufactursGet()
                    await delay(3000);
                    setLoader(false)
                }
            }else{
                const response = await API.remove_manufacturer_saller(reqObj)
                console.log("remresponse", response);
                if (response.data.success) {
                    MenufactursGet()
                    await delay(3000);
                    setLoader(false)
                    
                }
            }
           
        } catch (error) {
            
        }
    }

    // ? MenufactursList
    const MenufactursGet = async () =>{
        try {
            const response = await API.menufactursGet();
            setMenufacData(response.data.data)
            console.log("response", response);
            const sellerResponse = await API.manufacturer_saller(localStorage.getItem("__userId"))
            console.log("sellerResponse", sellerResponse);
            setMenuFacId(sellerResponse.data.data)
            await delay(3000);
            setLoader(false)
            
            
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
                                {/* <Vortex
                                    visible={true}
                                    height="40"
                                    width="40"
                                    ariaLabel="vortex-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="vortex-wrapper"
                                /> */}
                                {menuId === item._id ? (loader ? 
                                    <Vortex
                                        visible={true}
                                        height="40"
                                        width="40"
                                        ariaLabel="vortex-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="vortex-wrapper"
                                    /> : 
                                    <input class="form-check-input" 
                                type="checkbox" value="" 
                                onChange={()=> coosheHandaler(item._id)}
                                checked={menuFacId.manufacturer ? menuFacId.manufacturer.includes(item._id) ? true : false:""}
                            />) : (<input class="form-check-input" 
                            type="checkbox" value="" 
                            onChange={()=> coosheHandaler(item._id)}
                            checked={menuFacId.manufacturer ? menuFacId.manufacturer.includes(item._id) ? true : false:""}
                        />) }
                                {/* <input class="form-check-input" 
                                    type="checkbox" value="" 
                                    onChange={()=> coosheHandaler(item._id)}
                                    checked={menuFacId.manufacturer.includes(item._id) ? true : false}
                                /> */}
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