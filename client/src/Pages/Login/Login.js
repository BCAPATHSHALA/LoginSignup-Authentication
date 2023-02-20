import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../Utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../Utils/localStorageManager";
import "./Login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //! Call the the API with axiosClient Base URL 2
      const result = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      //! Store the access token in local storage setItem(key,value)
      setItem(KEY_ACCESS_TOKEN, result.accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Login">
      <div className="login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" className="submit" />
        </form>
        <p className="subheading">
          Do not have an account? <Link to={"/signup"}>Signup</Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
