import React, { useState } from "react";
import elements from "../../styles/elements";
import variants from "../../styles/variants";
import { motion } from "framer-motion";
import Axios from "axios";

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
      <section className="pt-10">
        <h1 className="pt-10 text-2xl text-center">Login</h1>
        <motion.form
          variants={variants.formVariants}
          initial="hidden"
          animate="show"
          onSubmit={handleSubmit}
          className={`${elements.form}`}
        >
          <label htmlFor="username" className="hidden">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            className={`${elements.input}`}
          />
          <label htmlFor="password" className="hidden">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className={`${elements.input}`}
          />
          <button type="submit" className={`${elements.greenButton}`}>
            Login
          </button>
        </motion.form>
      </section>
    </>
  );
};

export default LoginView;
