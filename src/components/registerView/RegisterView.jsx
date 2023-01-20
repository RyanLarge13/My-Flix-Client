import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import Axios from "axios";
import "./registerView.scss";
import "react-toastify/dist/ReactToastify.css";

const RegisterView = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const productionUrl = "https://my-flix-production.up.railway.app/";
  const devUrl = "http://localhost:8080/";

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${devUrl}users`, {
      Username: username,
      Password: password,
      Email: email,
    })
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.href = "http://localhost:1234/login";
        }, 3500);
      })
      .catch((err) =>
        toast.error(err.response.data, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };

  return (
    <section className="register-sec">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          name="Email"
          id="Email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="Username">Username</label>
        <input
          type="text"
          name="Username"
          id="Username"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          name="Password"
          id="Password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};

export default RegisterView;
