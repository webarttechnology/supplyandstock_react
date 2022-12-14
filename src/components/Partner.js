import React, { useEffect, useState } from "react";
import partNarLogo from "../assets/images/logoprt.png";
import { IMG } from "../api/constant";
import * as API from "../api/index";
const Partner = () => {
  const [menufacData, setMenufacData] = useState([]);
  // ? MenufactursList
  const MenufactursGet = async () => {
    try {
      const response = await API.menufactursGet();

      setMenufacData(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    MenufactursGet();
  }, []);

  return (
    <>
      <div className="partner">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="partnerHeading">Manufactures We Have</h1>
            </div>
          </div>
          <div className="row mt-5">
            {menufacData.map((item, index) => (
              <div className="col-md-2 text-center" key={index}>
                <div className="menuimgBox">
                  <img src={IMG + item.image} alt="" />
                  {/* <div className="align-items-center d-flex justify-content-evenly">
                                    <h4 className="menufecHeading">{item.name}</h4>
                                </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Partner;
