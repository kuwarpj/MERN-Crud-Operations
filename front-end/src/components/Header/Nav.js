import React, { useEffect } from 'react'
import "./Nav.css"
import {Link, useNavigate} from 'react-router-dom'
export default function Nav() {

  //Checking localStorage for User Data
const auth = localStorage.getItem("user");

//Logout Function
const Navigate = useNavigate()

function logout(){
  localStorage.clear()
  Navigate('/signup')
}
  return (
    <div className='Nav'>
      
       {auth ? <ul className='navUl'>
            <li><Link to="/">Product</Link></li>
            <li><Link to="/add">Add Product</Link></li>
            <li><Link to="/update">Update Product</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link onClick={logout} to="/signup">Logout</Link></li>
            </ul> :
          <ul className='navUl nav-right' >
            <li> <Link to="/signup">SignUp</Link></li>
            < li><Link to="/login">Login</Link></li>
            </ul>
}
           
            

                 
    </div>
  )
                }
