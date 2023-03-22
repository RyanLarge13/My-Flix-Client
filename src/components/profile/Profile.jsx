import { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import { toast } from "react-toastify";
import elements from "../../styles/elements";
import Axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [favList, setFavList] = useState([]);

  const token = localStorage.getItem("Token");
  const username = localStorage.getItem("Username");
  const productionUrl = "https://my-flix-production.up.railway.app/";
  const devUrl = "http://localhost:8080/";

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
        window.location.href = "http://localhost:1234/login/";
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
        window.location.href = "http://localhost:1234/";
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
          <h2 className="text-center text-xl font-bold my-2">
            {user.Username}
          </h2>
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
          <div className="">
            {favList.length > 0 ? (
              favList.map((movie, index) => (
                <div
                  className="mx-auto my-10 flex flex-col justify-center items-center"
                  key={index}
                >
                  <img
                    src={movie.ImageUrl}
                    alt="favorite movie photo"
                    className="w-[648px] h-[960px] rounded-md shadow-md"
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
              <div className="p-5 my-5 flex flex-col justify-center items-center">
                <p className="text-center my-5">
                  Add a new favorite movie to your list!
                </p>
                <a href="http://localhost:1234/movies">
                  <button className={`${elements.greenButton}`}>
                    See Movies
                  </button>
                </a>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center m-10">
            <button
              onClick={() => setDeleteConfirm(true)}
              className={`${elements.buttonRed}`}
            >
              Delete Profile
            </button>
          </div>
          {confirm && (
            <div className="backdrop">
              <div className="confirmation">
                <p>
                  Are you sure you wish to change your username to {newUsername}
                  ? You will be logged out.
                </p>
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
            </div>
          )}
          {deleteConfirm && (
            <div className="backdrop">
              <div className="confirmation">
                <p>Are you sure you want to delete your account?</p>
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
            </div>
          )}
        </div>
      ) : (
        <DotLoader />
      )}
    </section>
  );
};

export default Profile;
