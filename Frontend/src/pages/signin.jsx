import React from 'react'
import {useRef} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signin() {
  const emailRef=useRef()
  const passRef=useRef()
  const navigate=useNavigate()

  async function SigninHandler(){
    try{
      const email=emailRef.current.value
      const pass=passRef.current.value
      const response=await axios.post("http://localhost:3000/user/signin",{
        email:email,
        password:pass
      })
      console.log(response.data)
      localStorage.setItem('token',response.data.token);
      navigate('/dashboard')
    }
    catch(error){
      console.log(error)
    }
    
  }

  return (
    <div>
      <input id="email" type="email" placeholder='email' ref={emailRef}/>
      <input id="password" type="password" placeholder='password' ref={passRef}/>
      <button onClick={SigninHandler}>Submit</button>
    </div>
  )
}

export default Signin