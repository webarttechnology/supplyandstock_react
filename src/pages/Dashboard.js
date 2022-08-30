import React from 'react'
import EditProfile from './EditProfile'
import Manufactures from './Manufactures'
import ChangesPassword from "./ChangesPassword"
import { useNavigate } from "react-router";
const Dashboard = ({setIsLogin}) => {
    const navigate = useNavigate();
    const logOutBtn = () => {
        localStorage.removeItem("__userId")
        localStorage.removeItem("_tokenCode")
        localStorage.removeItem("_userType")
        localStorage.removeItem("isLoginCheck")
        setIsLogin(localStorage.removeItem("isLoginCheck"));
        if (localStorage.getItem("__userId") === null) {
            navigate("/")
        }
       
    }

  return (
    <>
        <div className="userDashboard">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="bannerSec">
                            <div className="row">
                                <div class="d-flex align-items-start">
                                    <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><span> <i class="bi bi-bounding-box"></i></span> user dashboard</button>
                                        <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false"><span><i class="bi bi-pencil-square"></i></span> Edit Profile</button>
                                        {localStorage.getItem("_userType") === "Buyer" ? (""):(
                                            <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false"><span><i class="bi bi-box-seam-fill"></i></span> Manufactures </button>
                                        ) }
                                        <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"><span> <i class="bi bi-key-fill"></i> </span>  Change password </button>
                                        <button class="nav-link logout" onClick={logOutBtn}><span> <i class="bi bi-box-arrow-left"></i> </span>  Logout </button>
                                    </div>
                                    <div class="tab-content" id="v-pills-tabContent">
                                        <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                            <h1 className="text-center">Welcome to Supply We Stock</h1>
                                        </div>
                                        <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                            <EditProfile setIsLogin={setIsLogin} />
                                        </div>
                                        <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                            {localStorage.getItem("_userType") === "Buyer" ? "" : <Manufactures setIsLogin={setIsLogin} />}
                                            
                                        </div>
                                        <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
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
  )
}

export default Dashboard