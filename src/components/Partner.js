import React from 'react'
import partNarLogo from "../assets/images/logoprt.png"
const Partner = () => {
  return (
    <>
        <div className="partner">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="partnerHeading">Manufactures We Have</h1>
                    </div>
                    <div className="col-md-12">
                        <img src={partNarLogo} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Partner