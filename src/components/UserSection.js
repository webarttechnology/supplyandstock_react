import React from 'react'
import { Link } from 'react-router-dom'
import fiest from "../assets/images/sas.png"
import secnd from "../assets/images/sadsadasd.png"
import thard from "../assets/images/assasa.png"
const UserSection = () => {
  return (
    <>
        <div className="userBadsg">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 text-center">
                        <img src={secnd} alt="" />
                    </div>
                    <div className="col-md-4 text-center">
                        <img src={fiest} alt="" />
                    </div>
                    <div className="col-md-4 text-center">
                        <img src={thard} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserSection