import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const initialData = {
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    password:"",
    confrimPassword:"",
}
const Login = () => {
const [formData, setFormData] = useState(initialData)

const handalerChnages = (e) => {
    const { name, value } = e.target;  
    setFormData({ ...formData, [name]: value });
} 

const submitHandaler = async () => {
    try {
        const reqObj = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            confrimPassword: formData.confrimPassword,  
        }
        console.log("reqObj", reqObj);

    } catch (error) {
        
    }
}



  return (
    <>
        <div className="loginSec">
            <div class="main">  	
                <input type="checkbox" id="chk" aria-hidden="true"/>
                <div class="signup">
                    <label for="chk" aria-hidden="true">Sign up</label>
                    <input onChange={handalerChnages} value={formData.firstName} type="text" name="firstName" placeholder="First Name" required="" />
                    <input onChange={handalerChnages} value={formData.lastName} type="text" name="lastName" placeholder="Last Name" required="" />
                    <input onChange={handalerChnages} value={formData.email} type="email" name="email" placeholder="Email" required="" />
                    <input onChange={handalerChnages} value={formData.phone} type="text" name="phone" placeholder="Phone number" required="" />
                    <input onChange={handalerChnages} value={formData.password} type="password" name="password" placeholder="Password" required="" />
                    <input onChange={handalerChnages} value={formData.confrimPassword} type="password" name="confrimPassword" placeholder="Confrim Password" required="" />
                    <button  className="customBtn" onClick={submitHandaler}>Sign up</button>
                </div>
                <div class="login">
                    <label for="chk" aria-hidden="true">Login</label>
                    <input type="email" name="email" placeholder="Email" required=""/>
                    <input type="password" name="pswd" placeholder="Password" required=""/>
                    <button className="customBtn">Login</button>
                    <Link className="forgotPass" to="/">Forgot Password ?</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login