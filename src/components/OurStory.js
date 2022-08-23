import React from 'react'
import { Link } from 'react-router-dom'
import ourStoryImg from "../assets/images/belun.jpg"

const OurStory = () => {
  return (
    <>
        <div className="ourStory">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="ourStoryCont">
                            <h2 className="mb-5">Our Story</h2>
                            <p className="bannerText">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse eget augue varius, aliquam libero eget, finibus elit. Aenean vitae convallis dolor, quis finibus dolor.
                            </p>
                            <p className="bannerText">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse eget augue varius, aliquam libero eget, finibus elit. Aenean vitae convallis dolor, quis finibus dolor.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse eget augue varius, aliquam libero eget, finibus elit. Aenean vitae convallis dolor, quis finibus dolor.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse eget augue varius, aliquam libero eget, finibus elit. Aenean vitae convallis dolor, quis finibus dolor.
                            </p>
                            <Link to="/" className="bannerBtn">more info</Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="ourImgSec">
                            <img src={ourStoryImg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default OurStory