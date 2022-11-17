import React, { useEffect, useState } from "react";
import { IMG } from "../api/constant";
import * as API from "../api/index";
import { Vortex } from "react-loader-spinner";
import { useNavigate } from "react-router";
import Select from "react-select";

const Manufactures = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [menufacData, setMenufacData] = useState([]);
  const [checked, setChecked] = useState("");
  const [menuFacId, setMenuFacId] = useState([]);
  const [loader, setLoader] = useState(false);
  const [menuId, setMenuId] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectData, setSelectData] = useState("");
  const [isDrop, setIsDrop] = useState(false);

  const handalerChange = async (data) => {
    const header = localStorage.getItem("_tokenCode");
    var itemId = [];
    data.map((item, index) => {
      itemId = item.id;
    });
    try {
      const reqObj = {
        id: localStorage.getItem("__userId"),
        manufacturer: itemId,
      };
      console.log("reqObj", reqObj);
      const response = await API.choose_manufacturer_saller(reqObj, header);
      console.log("Choosresponse", response);
      if (response.data.success === 1) {
        MenufactursGet();
      }
    } catch (error) {}
  };

  //  ? choose handaler
  const coosheHandaler = async (itemId) => {
    setMenuId(itemId);
    setLoader(true);
    const header = localStorage.getItem("_tokenCode");
    try {
      const reqObj = {
        id: localStorage.getItem("__userId"),
        manufacturer: itemId,
      };
      console.log("reqObj", reqObj);
      const response = await API.remove_manufacturer_saller(reqObj, header);
      console.log("remresponse", response);
      if (response.data.success === 1) {
        MenufactursGet();
        setLoader(false);
      } else {
        localStorage.removeItem("__userId");
        localStorage.removeItem("_tokenCode");
        localStorage.removeItem("_userType");
        localStorage.removeItem("isLoginCheck");
        setIsLogin(localStorage.removeItem("isLoginCheck"));
        navigate("/", { state: response.data.message });
      }
    } catch (error) {}
  };

  // ? MenufactursList
  const MenufactursGet = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.menufactursGet(header);
      setMenufacData(response.data.data);
      console.log("response74", response);
      const sellerResponse = await API.manufacturer_saller(
        localStorage.getItem("__userId"),
        header
      );
      console.log("response79", sellerResponse);
      setMenuFacId(sellerResponse.data.data.manufacturer);
    } catch (error) {}
  };

  const onfocuseHander = async (e) => {
    setIsDrop(true);
    // const header = localStorage.getItem("_tokenCode");
    // try {
    //   const response = await API.menufactursGet(header);
    //   setMenufacData(response.data.data);
    //   console.log("response", response);
    // } catch (error) {}
  };

  const searchHandaler = async (e) => {
    if (e.target.value === "") {
      MenufactursGet();
    } else {
      const header = localStorage.getItem("_tokenCode");
      try {
        const response = await API.menufact_search(e.target.value, header);
        console.log("searchHandaler", response);
        setMenufacData(response.data.data);
      } catch (error) {}
    }
  };

  useEffect(() => {
    MenufactursGet();
  }, []);

  return (
    <>
      <div className="manufactures">
        <h4 className="menuHading">Manufactures</h4>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search here..."
              onFocus={onfocuseHander}
              onChange={searchHandaler}
            />
            {isDrop ? (
              <>
                <div className="dropBox">
                  {menufacData.length === 0 ? (
                    <h5 className="text-center">Data Not Found</h5>
                  ) : (
                    <>
                      <ul className="dropDown">
                        {menufacData.map((item, index) => (
                          <li>{item.value}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </>
            ) : (
              ""
            )}
            {/* <Select
              isMulti
              onChange={(data) => handalerChange(data)}
              options={menufacData}
              placeholder="Manufactures"
              //value={skillArray[index]}
            /> */}
          </div>
        </div>
        <div className="row mt-5">
          {menuFacId === null
            ? ""
            : menuFacId.map((item, index) => (
                <div className="col-md-4 text-center" key={index}>
                  <div className="menuimgBox dashMenu">
                    <div className="align-items-center d-flex justify-content-between">
                      <h4 className="menufecHeading">{item.name}</h4>
                      <div
                        className="checkBOx"
                        onClick={() => coosheHandaler(item._id)}
                      >
                        <i class="bi bi-x-circle-fill"></i>
                      </div>
                      {/* {
                                    menuFacId.manufacturer ? menuFacId.manufacturer.includes(item._id) ? (
                                        <div className="checkBOx"><div class="check" onClick={() => coosheHandaler(item._id)}></div></div>
                                    ):(
                                        <div className="checkBOx" onClick={() => coosheHandaler(item._id , 1)}></div>
                                    ):("")
                                } */}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Manufactures;
