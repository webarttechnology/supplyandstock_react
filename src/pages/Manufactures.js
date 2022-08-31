import React, { useEffect, useState } from 'react'
import { IMG } from '../api/constant';
import * as API from "../api/index";
import { Vortex } from 'react-loader-spinner'
import { useNavigate } from 'react-router';
const Manufactures = ({setIsLogin}) => {
    const navigate = useNavigate();
    const [menufacData, setMenufacData] = useState([])
    const [checked, setChecked] = useState("");
    const [menuFacId, setMenuFacId] = useState([])
    const [loader, setLoader] = useState(false)
    const [menuId, setMenuId] = useState('')
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  
    //  ? choose handaler
    const coosheHandaler = async (itemId , Check) => {
        console.log("Check",Check);
        setMenuId(itemId)
        setLoader(true)
        const header = localStorage.getItem("_tokenCode");
        try {
            const reqObj = {
                id:localStorage.getItem("__userId"),
                manufacturer:itemId
            }
            console.log("reqObj",reqObj);
            if (Check === 1) {
                const response = await API.choose_manufacturer_saller(reqObj, header)
                console.log("Choosresponse", response);
                if (response.data.success === 1) {
                    MenufactursGet()
                    await delay(3000);
                    setLoader(false)
                }else{
                    localStorage.removeItem("__userId")
                    localStorage.removeItem("_tokenCode")
                    localStorage.removeItem("_userType")
                    localStorage.removeItem("isLoginCheck")
                    setIsLogin(localStorage.removeItem("isLoginCheck"));
                    navigate("/" , {state: response.data.message})
                }
            }else{
                const response = await API.remove_manufacturer_saller(reqObj, header)
                console.log("remresponse", response);
                if (response.data.success === 1) {
                    MenufactursGet()
                    await delay(3000);
                    setLoader(false)
                }else{
                    localStorage.removeItem("__userId")
                    localStorage.removeItem("_tokenCode")
                    localStorage.removeItem("_userType")
                    localStorage.removeItem("isLoginCheck")
                    setIsLogin(localStorage.removeItem("isLoginCheck"));
                    navigate("/" , {state: response.data.message})
                }
            }
           
        } catch (error) {
            
        }
    }

    // ? MenufactursList
    const MenufactursGet = async () =>{
        const header = localStorage.getItem("_tokenCode");
        try {
            const response = await API.menufactursGet(header);
            setMenufacData(response.data.data)
            console.log("response", response);
            const sellerResponse = await API.manufacturer_saller(localStorage.getItem("__userId"), header)
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
                {menufacData === null ? "" : menufacData.map((item, index)=>(
                    <div className="col-md-4 text-center" key={index}>
                        <div className="menuimgBox">
                            <img src={IMG + item.image} alt="" />
                            <div className="align-items-center d-flex justify-content-evenly">
                                <h4 className="menufecHeading">{item.name}</h4>
                                {
                                    menuFacId.manufacturer ? menuFacId.manufacturer.includes(item._id) ? (
                                        <div className="checkBOx"><div class="check" onClick={() => coosheHandaler(item._id)}></div></div>
                                    ):(
                                        <div className="checkBOx" onClick={() => coosheHandaler(item._id , 1)}></div>
                                    ):("")
                                }
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