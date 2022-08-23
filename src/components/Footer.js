import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 ps-0">
                        <div className="fotterMenu">
                            <ul className="ps-0">
                                <li>
                                    <Link to="/">CONTACT</Link>
                                </li>
                                <li>
                                    <Link to="/">TERMS OF SERVICES</Link>
                                </li>
                                <li>
                                    <Link to="/"> SHIPPING AND RETURNS</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="fooetrInput" placeholder="Give an email, get the newsletter" />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-8">
                        <p className="userTextFoter">© 2022 SWS. Terms of use and privacy policy</p>
                    </div>
                    <div className="col-md-4">
                        <ul className="ps-0 socilIcon">
                            <li><Link to="/"><i class="bi bi-facebook"></i></Link></li>
                            <li><Link to="/"><i class="bi bi-instagram"></i></Link></li>
                            <li><Link to="/"><i class="bi bi-twitter"></i></Link></li>
                            <li><Link to="/"><i class="bi bi-linkedin"></i></Link></li>
                            <li><Link to="/"><i class="bi bi-pinterest"></i></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer