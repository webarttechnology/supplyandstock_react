import React from 'react'
import { Link } from 'react-router-dom'
const Banner = () => {
  return (
    <>
        <div className="bannerHome">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h4 className="bannerWlcomeHeading">Welcome to</h4>
                        <h1 className="bannnercolorHaed">S<span className="commonColor">upply</span> W<span className="commonColor">e</span> S<span className="commonColor">tock</span></h1>
                        <div className="searchSec">
                            <div class="search">
                                <span><i class="bi bi-search"></i></span>
                                <input placeholder="Search term" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="bannerSec">
                    <div className="row">
                        <div className="col-md-6">
                            <h4 className="bannerWlcomeHeading">Welcome to our</h4>
                            
                            <p className="bannerText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce iaculis fermentum eros vel dictum. Aenean scelerisque mattis porttitor. Nulla facilisi. Vestibulum quis mattis erat. Aliquam varius mi a nunc lobortis.</p>
                            <Link to="/" className="bannerBtn">more info</Link>
                        </div>
                        <div className="col-md-6">
                            <img className="bannerimg" src={banner} alt="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="searchSec">
                            <div class="search">
                                <span><i class="bi bi-search"></i></span>
                                    <input placeholder="Search term" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    </>
  )
}

export default Banner