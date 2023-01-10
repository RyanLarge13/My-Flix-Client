import React, { useState } from "react";
import RegisterView from "../registerView/RegisterView";
import "./loginview.scss";

const LoginView = ({ onLoggedin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoggedin(username);
  };

  return (
    <>
      <section className="login-sec">
        <h1>Login</h1>
        <form>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </section>
    </>
  );
};

export default LoginView;
