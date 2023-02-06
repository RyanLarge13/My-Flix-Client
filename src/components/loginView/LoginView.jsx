import React, { useState } from "react";
import Axios from "axios";
import "./loginview.scss";

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productionUrl = "https://my-flix-production.up.railway.app/";
    const devUrl = "http://localhost:8080/";

    Axios.post(`${productionUrl}login`, {
      username: username,
      password: password,
    })
      .then((res) => {
        handleUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleUser = (userData) => {
    localStorage.setItem("Token", userData.token);
    localStorage.setItem("Username", userData.user);
    const user = userData.user;
    onLoggedIn(user);
  };

  return (
    <>
      <section className="login-sec">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </section>
    </>
  );
};

export default LoginView;
