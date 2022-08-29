import React from "react";
import { useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import Banner from "./Banner";
import GetTouch from "./GetTouch";
import OurStory from "./OurStory";
import Partner from "./Partner";
import UserSection from "./UserSection";

const Home = () => {
  const loaction = useLocation()
 
  // if (loaction) {
  //   toast(loaction.state, {
  //     position: "top-right",
  //     autoClose: 5000,
  //     type: "error",
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //   });
  // }
  return (
    <>
      {/* <ToastContainer /> */}
      <Banner/>
      <UserSection/>
      <Partner/>
      <OurStory />
      {/* <GetTouch/> */}
    </>
  );
};

export default Home;
