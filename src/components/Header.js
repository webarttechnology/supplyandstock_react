import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
const Header = ({isLogin}) => {
  const [search, setSearch] = useState(false)

  const searchShows = () =>{
    if (search) {
      setSearch(false)
    }else{
      setSearch(true)
    }
    
  }

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="justify-content-between row">
            <div className="col-md-3">
              <div className="logo">
                <img src={logo} alt="" />
              </div>
            </div>
            <div className="col-md-4 text-end">
              {isLogin ? (
                <>
                {localStorage.getItem("_userType") === "Buyer" ? (<Link to="/enquiry" className="loginBtn me-4 enquery">Enquiry</Link>):("")}
                  
                  <Link to="/user-dashboard" className="loginBtn">Dashboard</Link>
                </>
              ):(<Link to="/buyer/login" className="loginBtn">login</Link>)}
              
            </div>
          </div>
        </div>
      </div>
      <div className="headermain">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-5 ps-0">
              <div className="headerMenu">
                <ul className="ps-0 mobileMenu">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  {/* <li>
                    <Link to="/">Shop</Link>
                  </li>
                  <li>
                    <Link to="/">OUR STORY</Link>
                  </li> */}
                  <li>
                    <Link to="/">CONTACT</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 text-end">
              <div className="rightMenu">
                <ul>
                  {search === false ? (
                    <>
                    {isLogin ? (<li>
                      <Link to="/user-dashboard">
                        <i class="bi bi-person-circle"></i>
                      </Link>
                    </li>):("")}
                    
                    <li>
                      <Link to="/" className="countSec">
                        <i class="bi bi-heart-fill "></i>
                        <span className="countBang">0</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="countSec">
                        <i class="bi bi-bag-fill"></i>
                        <span className="countBang">0</span>
                      </Link>
                    </li>
                    </>
                  ):(
                    <li className="searchBox">
                      <input placeholder="Search here" type="text" className="seacrhBoxSr" />
                    </li>
                  )}
                  <li className="searchTuch">
                    <Link to="#" className="countSec" onClick={searchShows}>
                      <i class="bi bi-search"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
