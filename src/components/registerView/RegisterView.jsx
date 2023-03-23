import { useState } from "react";
import { motion } from "framer-motion";
import variants from "../../styles/variants";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import elements from "../../styles/elements";
import "react-toastify/dist/ReactToastify.css";

const RegisterView = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const productionUrl = "https://my-flix-production.up.railway.app/";

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${productionUrl}users`, {
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
    <section className="p-5 mt-20">
      <h1 className="text-2xl text-center text-white">Sign up</h1>
      <motion.form
        variants={variants.formVariants}
        initial="hidden"
        animate="show"
        onSubmit={handleSubmit}
        className={`${elements.form}`}
      >
        <label htmlFor="Email" className="hidden">
          Email
        </label>
        <motion.input
          variants={variants.formChildren}
          type="email"
          name="Email"
          id="Email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className={`${elements.input}`}
        />
        <label htmlFor="Username" className="hidden">
          Username
        </label>
        <motion.input
          variants={variants.formChildren}
          type="text"
          name="Username"
          id="Username"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className={`${elements.input}`}
        />
        <label htmlFor="Password" className="hidden">
          Password
        </label>
        <motion.input
          variants={variants.formChildren}
          type="password"
          name="Password"
          id="Password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className={`${elements.input}`}
        />
        <motion.button
          variants={variants.formChildren}
          type="submit"
          className={`${elements.greenButton}`}
        >
          Submit
        </motion.button>
      </motion.form>
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
