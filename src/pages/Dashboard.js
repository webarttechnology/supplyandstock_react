import React from "react";
import EditProfile from "./EditProfile";
import Manufactures from "./Manufactures";
import ChangesPassword from "./ChangesPassword";
import { useLocation, useNavigate } from "react-router";
import EnquiryList from "./EnquiryList";
import Order from "./Order";
import UserDashBoard from "./UserDashBoard";
import { io } from "socket.io-client";
import { SOCEKT, URL } from "../api/constant";
import { useEffect } from "react";
import { useState } from "react";
import ActiveAccount from "./ActiveAccount";
const Dashboard = ({ setIsLogin }) => {
  const [orderCount, setOrderCount] = useState([]);
  const [menuFetch, setMenuFetch] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [activeAccount, setActiveAcount] = useState(false);
  const navigate = useNavigate();
  const logOutBtn = () => {
    localStorage.removeItem("__userId");
    localStorage.removeItem("_tokenCode");
    localStorage.removeItem("_userType");
    localStorage.removeItem("isLoginCheck");
    setIsLogin(localStorage.removeItem("isLoginCheck"));
    if (localStorage.getItem("__userId") === null) {
      navigate("/");
    }
  };

  const socket = io(SOCEKT);

  useEffect(() => {
    socket.emit("notification", {
      id: localStorage.getItem("__userId"),
    });
  }, []);

  return (
    <>
      <div className="userDashboard">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="bannerSec">
                <div className="row">
                  <div className="col-md-4">
                    <div
                      class="nav flex-column nav-pills me-3"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <button
                        class="nav-link active"
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-home"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                      >
                        <span>
                          {" "}
                          <i class="bi bi-bounding-box"></i>
                        </span>{" "}
                        user dashboard
                      </button>
                      <button
                        class="nav-link"
                        id="v-pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-profile"
                        aria-selected="false"
                      >
                        <span>
                          <i class="bi bi-pencil-square"></i>
                        </span>{" "}
                        Edit Profile
                      </button>
                      {localStorage.getItem("_userType") === "Buyer" ? (
                        <button
                          class="nav-link"
                          id="v-pills-enqury-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-enqury"
                          type="button"
                          role="tab"
                          aria-controls="v-pills-enqury-tab"
                          aria-selected="false"
                        >
                          <span>
                            <i class="bi bi-window"></i>
                          </span>{" "}
                          Enquiry{" "}
                        </button>
                      ) : (
                        <>
                          <button
                            class="nav-link"
                            id="v-pills-messages-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-messages"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-messages"
                            aria-selected="false"
                          >
                            <span>
                              <i class="bi bi-box-seam-fill"></i>
                            </span>{" "}
                            Manufactures{" "}
                          </button>
                          <button
                            class="nav-link"
                            id="v-pills-stripe-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-stripe"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-stripe"
                            aria-selected="false"
                          >
                            <span>
                            <i class="bi bi-person-badge"></i>
                            </span>{" "}
                            Activate Stripe Account
                          </button>
                          <button
                            class="nav-link"
                            id="v-pills-enqury-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-enqury"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-enqury-tab"
                            aria-selected="false"
                          >
                            <span>
                              <i class="bi bi-window"></i>
                            </span>{" "}
                            Enquiry{" "}
                          </button>
                        </>
                      )}
                      {localStorage.getItem("_userType") === "Buyer" ? (
                        <>
                          <button
                            class="nav-link"
                            id="v-pills-order-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-order"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-order-tab"
                            aria-selected="false"
                          >
                            <span>
                              <i class="bi bi-truck"></i>
                            </span>{" "}
                            Order{" "}
                          </button>
                        </>
                      ) : (
                        <button
                          class="nav-link"
                          id="v-pills-order-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-order"
                          type="button"
                          role="tab"
                          aria-controls="v-pills-order-tab"
                          aria-selected="false"
                        >
                          <span>
                            <i class="bi bi-truck"></i>
                          </span>{" "}
                          Order{" "}
                        </button>
                      )}
                      <button
                        class="nav-link"
                        id="v-pills-settings-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-settings"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-settings"
                        aria-selected="false"
                      >
                        <span>
                          {" "}
                          <i class="bi bi-key-fill"></i>{" "}
                        </span>{" "}
                        Change password{" "}
                      </button>
                      <button class="nav-link logout" onClick={logOutBtn}>
                        <span>
                          {" "}
                          <i class="bi bi-box-arrow-left"></i>{" "}
                        </span>{" "}
                        Logout{" "}
                      </button>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div class="tab-content" id="v-pills-tabContent">
                      <div
                        class="tab-pane fade show active"
                        id="v-pills-home"
                        role="tabpanel"
                        aria-labelledby="v-pills-home-tab"
                      >
                        <UserDashBoard
                          menuFetch={menuFetch}
                          orderCount={orderCount}
                        />
                      </div>
                      <div
                        class="tab-pane fade"
                        id="v-pills-profile"
                        role="tabpanel"
                        aria-labelledby="v-pills-profile-tab"
                      >
                        <EditProfile setActiveAcount={setActiveAcount} setUserEmail={setUserEmail} setIsLogin={setIsLogin} />
                      </div>
                      <div
                        class="tab-pane fade"
                        id="v-pills-enqury"
                        role="tabpanel"
                      >
                        <EnquiryList setIsLogin={setIsLogin} />
                      </div>
                      <div
                        class="tab-pane fade"
                        id="v-pills-messages"
                        role="tabpanel"
                      >
                        <Manufactures
                          setMenuFetch={setMenuFetch}
                          setIsLogin={setIsLogin}
                        />
                      </div>
                      <div
                        class="tab-pane fade"
                        id="v-pills-stripe"
                        role="tabpanel"
                      >
                        <ActiveAccount activeAccount={activeAccount} userEmail={userEmail} />
                      </div>
                      <div
                        class="tab-pane fade"
                        id="v-pills-order"
                        role="tabpanel"
                        aria-labelledby="v-pills-profile-tab"
                      >
                        <Order setOrderCount={setOrderCount} />
                      </div>
                      <div
                        class="tab-pane fade"
                        id="v-pills-settings"
                        role="tabpanel"
                        aria-labelledby="v-pills-settings-tab"
                      >
                        <ChangesPassword />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
