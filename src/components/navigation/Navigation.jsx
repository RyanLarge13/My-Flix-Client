import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import elements from "../../styles/elements";
import { useNavigate } from "react-router-dom";

const Navigation = ({ user, setNav }) => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("Token");
    localStorage.removeItem("Username");
  };
  return (
    <>
      <motion.nav
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`${elements.nav}`}
      >
        <CgClose
          onClick={() => setNav(false)}
          className="absolute top-5 left-5 text-2xl"
        />
        {user ? (
          <ul>
            <li className="my-5">
              <Link to="/movies" onClick={() => setNav(false)}>
                Movies
              </Link>
            </li>
            <li className="my-5">
              <Link to="/profile" onClick={() => setNav(false)}>
                Profile
              </Link>
            </li>
            <li className="my-5">
              <Link
                onClick={() => {
                  logout();
                  setNav(false);
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li className="my-5">
              <Link to="/" onClick={() => setNav(false)}>
                Signup
              </Link>
            </li>
            <li className="my-5">
              <Link to="/login" onClick={() => setNav(false)}>
                Login
              </Link>
            </li>
          </ul>
        )}
      </motion.nav>
    </>
  );
};

export default Navigation;
