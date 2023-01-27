import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { io } from "socket.io-client";
import { SOCEKT, TIMEZONE } from "../api/constant";
import * as API from "../api/index";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import moment from "moment-timezone";
const Header = ({ isLogin, totalNotification }) => {
  const [search, setSearch] = useState(false);
  const [notification, setNotification] = useState([]);
  const [messCunt, setMessCunt] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const socket = io(SOCEKT);
  const searchShows = () => {
    if (search) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  };

  const notificationhide = async (messId) => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const reqObj = {
        id: messId,
      };

      const response = await API.noification_hide(reqObj, header);

      if (response.data.success === 1) {
        notificationrender();
      }
    } catch (error) {}
  };

  const notificationrender = () => {
    socket.emit("notification", {
      id: localStorage.getItem("__userId"),
    });
  };

  useEffect(() => {
    notificationrender();
    socket.on("receiveNotification", (data) => {
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
            <div className="col-md-4 mobileView text-end">
              <button className="mobileToggal" onClick={toggleDrawer}>
                <i class="bi bi-list"></i>
              </button>
              <li>
                <Link to="#" className="countSec ballDrop mobileNotif">
                  <i class="bi bi-bell-fill"></i>
                  <span className="countBang">
                    {messCunt === 1 ? (
                      <>{notification.length}</>
                    ) : (
                      <>{notification.length}</>
                    )}
                  </span>
                  <ul className="submenu">
                    {notification.length === 0 ? (
                      <h4 className="noHadding">No notification</h4>
                    ) : (
                      <>
                        {notification.map((item, index) => {
                          const diffDatHour = moment(new Date()).diff(
                            moment(item.createdAt),
                            "hours"
                          );
                          return (
                            <>
                              {item.showFor.includes(
                                localStorage.getItem("__userId")
                              ) ? (
                                <li
                                //onClick={() => notificationhide(item._id)}
                                >
                                  <span>{item.message}</span>
                                  <span className="ms-2 dateTimef">
                                    {diffDatHour < 24 ? (
                                      <>
                                        {moment
                                          .utc(item.createdAt)
                                          .tz(TIMEZONE)
                                          .format("h:m A")}
                                      </>
                                    ) : (
                                      <>
                                        {moment(item.createdAt).format(
                                          "DD-MMM-YY"
                                        )}
                                      </>
                                    )}
                                  </span>
                                </li>
                              ) : (
                                ""
                              )}
                            </>
                          );
                        })}
                      </>
                    )}
                  </ul>
                </Link>
              </li>

              {isLogin ? (
                <>
                  {localStorage.getItem("_userType") === "Buyer" ? (
                    <Link to="/enquiry" className="loginBtn me-4 enquery">
                      Enquiry
                    </Link>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="headermain">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-7 ps-0">
              <div className="headerMenu">
                <ul className="ps-0 mobileMenu">
                  {/* {isLogin ? (
                    ""
                  ) : (
                    <li>
                      <Link to="/home">Home</Link>
                    </li>
                  )} */}
                  <li>
                    <Link to="/home">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About us</Link>
                  </li>
                  <li>
                    <Link to="/sellers">For Sellers</Link>
                  </li>
                  <li>
                    <Link to="/buyers"> For Buyers</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-5 text-end">
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
                            {notification.length === 0 ? (
                              <h4 className="noHadding">No notification</h4>
                            ) : (
                              <>
                                {notification.map((item, index) => {
                                  const diffDatHour = moment(new Date()).diff(
                                    moment(item.createdAt),
                                    "hours"
                                  );
                                  return (
                                    <>
                                      {item.showFor.includes(
                                        localStorage.getItem("__userId")
                                      ) ? (
                                        <li
                                        //onClick={() => notificationhide(item._id)}
                                        >
                                          <span>{item.message}</span>
                                          <span className="ms-2 dateTimef">
                                            {diffDatHour < 24 ? (
                                              <>
                                                {moment
                                                  .utc(item.createdAt)
                                                  .tz(TIMEZONE)
                                                  .format("h:m A")}
                                              </>
                                            ) : (
                                              <>
                                                {moment(item.createdAt).format(
                                                  "DD-MMM-YY"
                                                )}
                                              </>
                                            )}
                                          </span>
                                        </li>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  );
                                })}
                              </>
                            )}
                          </ul>
                        </Link>
                      </li>
                      {/* <li>
                        <Link to="/" className="countSec">
                          <i class="bi bi-bag-fill"></i>
                          <span className="countBang">0</span>
                        </Link>
                      </li> */}
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
                  {isLogin ? (
                    <li>
                      <Link to="/user-dashboard" className="loginBtn">
                        Dashboard
                      </Link>
                    </li>
                  ) : (
                    <Link to="/" className="loginBtn">
                      login
                    </Link>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE MENU FUNCATIONALTY */}
      <div className="mobileMenu">
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="bla bla bla"
        >
          <div className="mobileheader">
            <div className="d-flex justify-content-between px-3 menuHeader">
              <h3>Menu</h3>
              <span
                onClick={() => setIsOpen(false)}
                className="fs-4 pt-2 text-white"
              >
                <i class="bi bi-x-lg"></i>
              </span>
            </div>
            <ul className="manuunderList">
              {isLogin ? (
                <li>
                  <Link onClick={() => setIsOpen(false)} to="/user-dashboard">
                    My Account
                  </Link>
                </li>
              ) : (
                <li>
                  <Link onClick={() => setIsOpen(false)} to="/">
                    Home
                  </Link>
                </li>
              )}

              {isLogin ? (
                <>
                  {localStorage.getItem("_userType") === "Buyer" ? (
                    <>
                      <li>
                        <Link to="/enquiry" onClick={() => setIsOpen(false)}>
                          Enquiry
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => setIsOpen(false)}
                          to="/user-dashboard"
                        >
                          Dashboard
                        </Link>
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <li>
                  <Link to="/buyer/login" onClick={() => setIsOpen(false)}>
                    login
                  </Link>
                </li>
              )}

              <li className="mt-3 px-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here"
                />
              </li>
            </ul>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default Header;
