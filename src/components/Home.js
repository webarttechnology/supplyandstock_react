import React from "react";
import { useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import Banner from "./Banner";
import GetTouch from "./GetTouch";
import OurStory from "./OurStory";
import Partner from "./Partner";
import UserSection from "./UserSection";

const Home = ({ setCommonModal, commonModal }) => {
  const loaction = useLocation();

  return (
    <>
      <Banner setCommonModal={setCommonModal} commonModal={commonModal} />
      {/* <UserSection/> */}
      {/* <Partner/> */}
      {/* <OurStory /> */}
      {/* <GetTouch/> */}
    </>
  );
};

export default Home;
