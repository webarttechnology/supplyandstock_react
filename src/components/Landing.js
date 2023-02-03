import React from "react";
import { useEffect } from "react";
import Banner from "./Banner";
import Features from "./Features";
import OurStory from "./OurStory";
import Video from "./Video";
import SignupSeller from "../pages/SignupSeller";

const Landing = ({ setLandingpage, landingpage }) => {
  useEffect(() => {
    setLandingpage(true);
  }, []);

  return (
    <>
      <Banner landingpage={landingpage} />
      <OurStory landingpage={landingpage} />
      <Features />
      <Video landingpage={landingpage} />
      <SignupSeller landingpage={landingpage} />
    </>
  );
};

export default Landing;
