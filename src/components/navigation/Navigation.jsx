import { motion } from "framer-motion";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation.scss";

const Navigation = ({ user }) => {
  return (
    <>
      {user ? (
        <Navbar className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </Navbar>
      ) : (
        <Navbar className="nav">
          <ul>
            <li>
              <Link to="/">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </Navbar>
      )}
    </>
  );
};

export default Navigation;
