import React, { useEffect, useState } from "react";
import { IMG } from "../api/constant";
import * as API from "../api/index";
import { ThreeDots, Vortex } from "react-loader-spinner";
import { useNavigate } from "react-router";
import Select from "react-select";
import { alphabetData } from "../helpers/commonData";

const Manufactures = ({ setIsLogin, setMenuFetch }) => {
  const navigate = useNavigate();
  const [menufacData, setMenufacData] = useState([]);
  const [menuFacId, setMenuFacId] = useState([]);
  const [loader, setLoader] = useState(false);
  const [menuId, setMenuId] = useState("");
  const [isDrop, setIsDrop] = useState(false);
  const [menuClickData, setMenuClickData] = useState([]);
  const [isChecked, setIsChecked] = useState("");
  const [menuSelectid, setMenuSelectid] = useState([]);

  const handalerChange = async (data) => {
    setLoader(true);
    const header = localStorage.getItem("_tokenCode");
    try {
      const reqObj = {
        id: localStorage.getItem("__userId"),
        manufacturer: data,
      };

      const response = await API.choose_manufacturer_saller(reqObj, header);

      if (response.data.success === 1) {
        MenufactursGet();
        setIsDrop(false);
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

      const response = await API.remove_manufacturer_saller(reqObj, header);

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

      const sellerResponse = await API.manufacturer_saller(
        localStorage.getItem("__userId"),
        header
      );
      if (sellerResponse.data.success === 1) {
        setLoader(false);
      }

      setMenuFacId(sellerResponse.data.data.manufacturer);
      setMenuFetch(sellerResponse.data.data.manufacturer);
      const menuSelectArry = [];
      sellerResponse.data.data.manufacturer.map((item, index) =>
        menuSelectArry.push(item._id)
      );
      setMenuSelectid(menuSelectArry);
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

        setMenufacData(response.data.data);
      } catch (error) {}
    }
  };

  const manufacturesListAdd = async (data) => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.menufact_search(data, header);

      setMenuClickData(response.data.data);
    } catch (error) {}
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
              placeholder="Search manufactures"
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
                      <span
                        className="dropOff"
                        onClick={() => setIsDrop(false)}
                      >
                        <i class="bi bi-x-lg"></i>
                      </span>
                      <ul className="dropDown">
                        {menufacData.map((item, index) => (
                          <li onClick={() => handalerChange(item.id)}>
                            {item.value}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </>
            ) : (
              ""
            )}
            <h4 className="alphLable">Alphabetic search</h4>
            <ul className="alphabetList">
              {alphabetData.map((item, index) => (
                <li key={index} onClick={() => manufacturesListAdd(item)}>
                  {item}
                </li>
              ))}
            </ul>
            {menuClickData.length === 0 ? (
              ""
            ) : (
              <div className="menuFatchDataList">
                {loader ? (
                  <ul className="menuFectunderList d-flex align-items-center justify-content-center">
                    <ThreeDots
                      height="30"
                      width="100%"
                      radius="9"
                      color="#9b6a6cdb"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                  </ul>
                ) : (
                  <ul className="menuFectunderList">
                    {menuClickData.map((item, index) => (
                      <li key={index}>
                        <input
                          className="checkBoxList"
                          id={index}
                          checked={
                            menuSelectid.includes(item.id) ? true : false
                          }
                          // checked={
                          //   menuClickData.includes(isChecked) ? true : false
                          // }
                          onChange={() => handalerChange(item.id)}
                          type="checkbox"
                        />

                        {item.value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* <Select
              isMulti
              onChange={(data) => handalerChange(data)}
              options={menufacData}
              placeholder="Manufactures"
              //value={skillArray[index]}
            /> */}
          </div>
          <div className="col-md-4">
            <div className="getMenuUser">
              {menuFacId === null
                ? ""
                : menuFacId.map((item, index) => (
                    <div className="col-md-12 text-center p-0" key={index}>
                      <div className="menuimgBox dashMenu">
                        <div className="align-items-center d-flex justify-content-between">
                          <h4 className="menufecHeading">{item.name}</h4>
                          <div
                            className="checkBOx"
                            onClick={() => coosheHandaler(item._id)}
                          >
                            <i class="bi bi-x-circle-fill"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <div className="row mt-5"></div>
      </div>
    </>
  );
};

export default Manufactures;
