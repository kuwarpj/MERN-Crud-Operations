import React, { useEffect } from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./SignUp.css"
export default function SignUp() {
    const [name,setName] = useState("")
    const[email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const Navigate = useNavigate();

    //Thsi Function is Used to disable Signup if User is Already Signin
    useEffect(()=>{
      const auth = localStorage.getItem("user")
      if(auth){
        Navigate('/')
      }
    })

    const getData= async ()=>{
        
    console.log(name, email, password)
    let  result = await fetch('http://localhost:5000/register',{
      method:'post',
      body:JSON.stringify({name, email, password}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    result = await result.json()
    console.log(result)
    localStorage.setItem("user", JSON.stringify(result.result))
    localStorage.setItem("token", JSON.stringify(result.auth))
      Navigate('/')
   

    }
  return (
    <div className='SignUp'>
        
        <h2>Register</h2>

        <input className='inputBox' type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter Your Name '></input>
        <input className='inputBox' type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Your Email '></input>
        <input className='inputBox' type="password" value={password} onChange={(e)=> setPass(e.target.value)} placeholder='Enter Your password '></input>
        <button className='Sinbutton' onClick={getData} type='button'>Sign Up</button>
        
        
       </div>



  )
}
