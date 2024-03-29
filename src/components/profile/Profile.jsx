import { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import elements from "../../styles/elements";
import Axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [favList, setFavList] = useState([]);
  const [settings, setSettings] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const username = localStorage.getItem("Username");
  const productionUrl = "https://my-flix-production.up.railway.app/";

  useEffect(() => {
    Axios.get(`${productionUrl}users/${username}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (user) {
      callMovies();
    }
  }, [user]);

  const confirmUsername = (e) => {
    e.preventDefault();
    setConfirm(true);
  };

  const submitUsername = (e) => {
    e.preventDefault();
    Axios.put(
      `${productionUrl}users`,
      {
        Username: user.Username,
        newUsername: newUsername,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        localStorage.removeItem("Token");
        localStorage.removeItem("Username");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = () => {
    Axios.delete(`${productionUrl}users/${user.Username}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        localStorage.removeItem("Token");
        localStorage.removeItem("Username");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const callMovies = () => {
    user.FavoriteMovies.map((id) =>
      Axios.get(`${productionUrl}movie/${id}`)
        .then((res) => {
          setFavList((prev) => [...prev, res.data]);
        })
        .catch((err) => console.log(err))
    );
  };

  const removeFav = (id) => {
    Axios.delete(`${productionUrl}${user.Username}/movies/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const newList = favList.filter((movie) => movie._id !== id);
        setFavList(newList);
        toast.success("Succesfully deleted", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="mt-20">
      {user ? (
        <div>
          <h2 className="text-center text-xl font-bold my-2 text-white bg-[#222222] mx-auto w-[300px] py-2 rounded-md shadow-md sticky top-10">
            {user.Username}
          </h2>
          <p className="mx-auto w-max my-20 text-white font-bold">
            Your Favorite Movies
          </p>
          <div className="px-3 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favList.length > 0 ? (
              favList.map((movie, index) => (
                <div
                  className="my-10 mx-auto p-10 rounded-md shadow-md flex flex-col justify-center items-center bg-[#222222]"
                  key={index}
                >
                  <img
                    onClick={() => navigate(`/movies/${movie.Title}`)}
                    src={movie.ImageUrl}
                    alt="favorite movie photo"
                    className="rounded-md shadow-md cursor-pointer"
                  />
                  <button
                    onClick={() => removeFav(movie._id)}
                    className={`${elements.buttonRed}`}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <div className="p-5 my-5 mt-20 flex flex-col justify-center items-center rounded-md shaqdow-md bg-white w-[300px] mx-auto">
                <p className="text-center my-5">
                  Add a new favorite movie to your list!
                </p>
                <button
                  className={`${elements.greenButton}`}
                  onClick={() => navigate("/movies")}
                >
                  See Movies
                </button>
              </div>
            )}
          </div>
          {confirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="z-50 fixed bottom-10 left-[50%] translate-x-[-50%] rounded-md shadow-md p-5 bg-white"
            >
              <p>
                Are you sure you wish to change your username to {newUsername}?
                You will be logged out.
              </p>
              <div className="w-full flex justify-around items-center">
                <button
                  className={`${elements.buttonRed}`}
                  onClick={submitUsername}
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirm(false)}
                  className={`${elements.greenButton}`}
                >
                  No
                </button>
              </div>
            </motion.div>
          )}
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="z-50 fixed bottom-10 left-[50%] translate-x-[-50%] rounded-md shadow-md p-5 bg-white"
            >
              <p>Are you sure you want to delete your account?</p>
              <div className="w-full flex justify-around items-center">
                <button
                  className={`${elements.buttonRed}`}
                  onClick={deleteUser}
                >
                  Yes
                </button>
                <button
                  onClick={() => setDeleteConfirm(false)}
                  className={`${elements.greenButton}`}
                >
                  No
                </button>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <DotLoader />
      )}
      {settings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          className="inset-0 fixed bg-[#222222] flex flex-col justify-around items-center"
        >
          <form className="flex flex-col justify-center items-center">
            <label htmlFor="username" className="hidden">
              Username
            </label>
            <input
              onChange={(e) => setNewUsername(e.target.value)}
              type="text"
              name="username"
              id="username"
              value={newUsername}
              placeholder="Change Username"
              className={`${elements.input} text-center`}
            />
            <button
              onClick={confirmUsername}
              className={`${elements.greenButton}`}
            >
              Submit
            </button>
          </form>
          <div className="flex justify-center items-center m-10">
            <button
              onClick={() => setDeleteConfirm(true)}
              className={`${elements.buttonRed}`}
            >
              Delete Profile
            </button>
          </div>
        </motion.div>
      )}
      <FaCog
        onClick={() => setSettings((prev) => !prev)}
        className="fixed bottom-5 right-5 text-xl text-white cursor-pointer"
      />
    </section>
  );
};

export default Profile;
