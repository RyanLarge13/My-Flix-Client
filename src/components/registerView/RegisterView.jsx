import "./registerView.scss";

import React, { useState, useEffect } from "react";

const RegisterView = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e) => {};

  const changeUsername = (e) => {};

  const changePass = (e) => {};

  return (
    <>
      <h1>Register!</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={changeEmail}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder="Username"
          onChange={changeUsername}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={changePass}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterView;
