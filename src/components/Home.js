import React from "react";
import Banner from "./Banner";
import GetTouch from "./GetTouch";
import OurStory from "./OurStory";
import Partner from "./Partner";
import UserSection from "./UserSection";

const Home = () => {
  return (
    <>
      <Banner/>
      <UserSection/>
      <Partner/>
      <OurStory />
      {/* <GetTouch/> */}
    </>
  );
};

export default Home;
