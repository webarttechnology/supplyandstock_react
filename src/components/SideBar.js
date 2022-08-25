import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <>
        <div className="userSideBar">
            <ul className="ps-0"> 
                <li>
                    <NavLink to="/user-dashboard"> <span> <i class="bi bi-bounding-box"></i></span>  user dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/edit-profile"> <span><i class="bi bi-pencil-square"></i></span> Edit Profile </NavLink>
                </li>
                <li>
                    <NavLink to="/"> <span> <i class="bi bi-key-fill"></i> </span>  Change password</NavLink>
                </li>
            </ul>
        </div>
    </>
  )
}

export default SideBar