import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as API from "../api/index";
const AccountActive = () => {
  const navigate = useNavigate();
  const accountStatus = async () => {
    try {
      const reqObj = {
        id: localStorage.getItem("__userId"),
      };
      const response = await API.account_status(reqObj);
      console.log("response", response);
      if (response.data.success === 1) {
        navigate("/user/account-active");
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
  useEffect(() => {
    accountStatus();
  }, []);

  return (
    <div>
      <h1></h1>
    </div>
  );
};

export default AccountActive;
