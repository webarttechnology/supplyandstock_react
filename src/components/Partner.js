import React, { useEffect } from 'react'
import partNarLogo from "../assets/images/logoprt.png"
const Partner = () => {

    const partnerLogo = () => {
        try {
            
        } catch (error) {
            
        }
    }

  useEffect(() => {
    partnerLogo()
  }, [])
  
    
  return (
    <>
        <div className="partner">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="partnerHeading">Manufactures We Have</h1>
                    </div>
                    <div className="col-md-12 text-center">
                        <img src={partNarLogo} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Partner