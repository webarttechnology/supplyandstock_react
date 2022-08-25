import React from 'react'

const EditProfile = () => {
  return (
    <>
      <div className="row mb-4">
          <div className="col-md-6">
              <label for="exampleFormControlInput1" class="form-label">First Name</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="First Name" />
          </div>
          <div className="col-md-6">
              <label for="exampleFormControlInput1" class="form-label">Last Name</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Last Name" />
          </div>
      </div>
      <div className="row mb-4">
          <div className="col-md-6">
              <label for="exampleFormControlInput1" class="form-label">Email Adderss</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
          <div className="col-md-6">
            <label for="exampleFormControlInput1" class="form-label">Mobile Number</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Mobile Number" />
          </div>
      </div>
      <div className="justify-content-center mb-4 row">
          <div className="col-md-4">
              <span class="bannerBtn text-center w-100">Update</span>
          </div>
      </div>
    </>
  )
}

export default EditProfile