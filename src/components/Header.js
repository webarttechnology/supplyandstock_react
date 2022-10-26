import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { io } from "socket.io-client";
import { SOCEKT } from "../api/constant";
const Header = ({ isLogin, totalNotification }) => {
  const [search, setSearch] = useState(false);
  const [notification, setNotification] = useState([]);
  const [messCunt, setMessCunt] = useState(0);

  const socket = io(SOCEKT);
  const searchShows = () => {
    if (search) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  };

  const notificationrender = () => {
    socket.emit("notification", {
      id: localStorage.getItem("__userId"),
    });
  };

  useEffect(() => {
    notificationrender();
    socket.on("receiveNotification", (data) => {
      console.log("receiveNotification", data.notification);
      if (data.show === localStorage.getItem("__userId")) {
        setNotification(data.notification);
        data.notification.map((item, index) =>
          item.showFor.includes(localStorage.getItem("__userId"))
            ? setMessCunt(1)
            : setMessCunt(0)
        );
      }
    });
  }, []);

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
                  {localStorage.getItem("_userType") === "Buyer" ? (
                    <Link to="/enquiry" className="loginBtn me-4 enquery">
                      Enquiry
                    </Link>
                  ) : (
                    ""
                  )}

                  <Link to="/user-dashboard" className="loginBtn">
                    Dashboard
                  </Link>
                </>
              ) : (
                <Link to="/buyer/login" className="loginBtn">
                  login
                </Link>
              )}
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
                      {isLogin ? (
                        <li>
                          <Link to="/user-dashboard">
                            <i class="bi bi-person-circle"></i>
                          </Link>
                        </li>
                      ) : (
                        ""
                      )}

                      <li>
                        <Link to="#" className="countSec ballDrop">
                          <i class="bi bi-bell-fill"></i>
                          <span className="countBang">
                            {messCunt === 1 ? (
                              <>{notification.length}</>
                            ) : (
                              <>{notification.length}</>
                            )}
                          </span>
                          <ul className="submenu">
                            {notification.map((item, index) =>
                              item.showFor.includes(
                                localStorage.getItem("__userId")
                              ) ? (
                                <li>
                                  <span>{item.message}</span>
                                  {/* <span className="ms-2">
                                    <i class="bi bi-eye-fill"></i>
                                  </span> */}
                                </li>
                              ) : (
                                ""
                              )
                            )}
                          </ul>
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="countSec">
                          <i class="bi bi-bag-fill"></i>
                          <span className="countBang">0</span>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="searchBox">
                      <input
                        placeholder="Search here"
                        type="text"
                        className="seacrhBoxSr"
                      />
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
