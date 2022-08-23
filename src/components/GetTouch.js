import React from 'react'

const GetTouch = () => {
  return (
    <>
        <div className="getTouch">
            <div className="container position-relative">
              <div className="row">
                  <div className="col-md-12">
                      <h1 class="partnerHeading mb-3">Get in touch</h1>
                  </div>
              </div>
              <div className="row mt-5">
                  <div className="col-md-6">
                      <input type="text" placeholder="First Name" className="conatctInput" />
                  </div>
                  <div className="col-md-6">
                      <input type="text" placeholder="Last Name" className="conatctInput" />
                  </div>
              </div>
              <div className="row mt-5">
                  <div className="col-md-6">
                      <input type="text" placeholder="Phone Number" className="conatctInput" />
                  </div>
                  <div className="col-md-6">
                      <input type="text" placeholder="Your Email Adderss" className="conatctInput" />
                  </div>
              </div>
              <div className="row mt-5">
                  <div className="col-md-12">
                      <textarea rows="5" cols="5" placeholder="Your Message" className="conatctInput"></textarea>
                  </div>
                  <div className="col-md-12 text-center">
                      <button className="sendMessage">Send Message</button>
                  </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default GetTouch