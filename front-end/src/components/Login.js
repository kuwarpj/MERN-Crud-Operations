import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const Navigate = useNavigate();

  //If user is login they cant go to the login pages
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      Navigate("/");
    }
  }, []);

  async function loginHandle() {
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      Navigate("/");
    } else {
      alert("Invalid Email or Password!!!");
    }
  }
  return (
    <div className="Login">
      <h1>Login Page</h1>
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      ></input>
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      ></input>
      <button className="Sinbutton" onClick={loginHandle} type="button">
        Login
      </button>
    </div>
  );
}
