import React from 'react'
import { Link } from 'react-router-dom'

const UserSection = () => {
  return (
    <>
        <div className="userSection">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="usertypeBox">
                            <span>
                                <Link to="/">Buyer <i class="bi bi-arrow-right"></i></Link>
                            </span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="usertypeBox sellerBox">
                            <span>
                                <Link to="/">Seller </Link>
                                <div className="userBtn">
                                    <Link to="/">Login </Link>
                                    <Link to="/">SignUp </Link>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserSection