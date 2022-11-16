import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IMG, SOCEKT } from "../api/constant";
import { io } from "socket.io-client";
import * as API from "../api/index";

const initialData = {
  manufacturerId: "",
  product_des: "",
  size: "",
  quantities: "",
  color: "",
  productName: "",
};

const Enquiry = () => {
  const socket = io(SOCEKT);
  const navigate = useNavigate();
  const [menufacData, setMenufacData] = useState([]);
  const [formData, setFormData] = useState(initialData);

  const handalerChanges = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ? MenufactursList
  const MenufactursGet = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.menufactursGet(header);
      setMenufacData(response.data.data);
      console.log("response", response);
    } catch (error) {}
  };

  const upDateSubmitBtn = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const reqObj = {
        buyerId: localStorage.getItem("__userId"),
        manufacturerId: formData.manufacturerId,
        product_des: formData.product_des,
        size: formData.size,
        quantities: formData.quantities,
        color: formData.color,
        productName: formData.productName,
      };
      console.log("reqObj", reqObj);
      const response = await API.buyer_enqueris(reqObj, header);
      console.log("response", response);
      if (response.data.success === 1) {
        response.data.sellerId.map((item, index) =>
          socket.emit("notification", {
            id: item,
          })
        );
        setFormData(initialData);
        toast(response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {}
  };

  const btnDisabl =
    !formData.manufacturerId || !formData.quantities || !formData.size;

  const validationBtn = () => {
    if (!formData.manufacturerId) {
      toast("Please select manufacturer", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!formData.quantities) {
      toast("Please enter quantities", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!formData.size) {
      toast("Please enter size", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    MenufactursGet();
  }, []);

  return (
    <>
      <div className="userDashboard ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="bannerSec">
                <h1 className="text-center mb-4">Enquiry Form</h1>
                <label className="enqLable">Manufacturer </label>
                <select
                  name="manufacturerId"
                  onChange={handalerChanges}
                  className="form-control"
                >
                  <option>--- Select ---</option>
                  {menufacData.map((item, index) => (
                    <option value={item.id}>{item.label}</option>
                  ))}
                </select>
                <label className="enqLable">Product name</label>
                <input
                  placeholder="Product name"
                  onChange={handalerChanges}
                  value={formData.productName}
                  name="productName"
                  type="text"
                  className="form-control"
                />
                <label className="enqLable">Quantities </label>
                <input
                  placeholder="Enter quantities"
                  onChange={handalerChanges}
                  value={formData.quantities}
                  name="quantities"
                  type="text"
                  className="form-control"
                />
                <label className="enqLable"> Size/Model </label>
                <input
                  placeholder="Enter size"
                  type="text"
                  onChange={handalerChanges}
                  value={formData.size}
                  name="size"
                  className="form-control"
                />
                <label className="enqLable"> Color </label>
                <input
                  placeholder="Enter color"
                  type="text"
                  onChange={handalerChanges}
                  value={formData.color}
                  name="color"
                  className="form-control"
                />
                <label className="enqLable"> Product details </label>
                <textarea
                  className="form-control"
                  onChange={handalerChanges}
                  value={formData.product_des}
                  name="product_des"
                  placeholder="Enter product details"
                  rows="5"
                  cols="5"
                ></textarea>
                <div className="justify-content-center mt-4 row">
                  <div className="col-md-4">
                    <span
                      class="bannerBtn text-center w-100 enqurybtn"
                      onClick={btnDisabl ? validationBtn : upDateSubmitBtn}
                    >
                      Submit
                    </span>
                  </div>
                  <div className="col-md-4">
                    <span class="bannerBtn text-center w-100">
                      <Link to="/user-dashboard">Close</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enquiry;
