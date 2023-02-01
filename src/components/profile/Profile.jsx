import { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import Axios from "axios";
import "./profile.scss";

const Profile = () => {
  const [user, setUser] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
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
        window.location.href = `${devUrl}`;
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
        window.location.href = `${devUrl}`;
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
    setShowFavorites(true);
  };

  const removeFav = (id) => {
    Axios.delete(`${devUrl}${user.Username}/movies/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setShowFavorites(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="profile">
      {user ? (
        <div>
          <h1>Profile</h1>
          <h2 className="username">{user.Username}</h2>
          <p>
            Welcome to your <strong>My Flix</strong> profile. Below is a
            complete list of your favorite movies
          </p>
          <form className="username-form">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setNewUsername(e.target.value)}
              type="text"
              name="username"
              id="username"
              value={newUsername}
            />
            <button onClick={confirmUsername}>Change Username</button>
          </form>
          <div className="favorite-movies">
            {showFavorites ? (
              favList.length > 0 ? (
                favList.map((movie, index) => (
                  <div className="movie" key={index}>
                    <img src={movie.ImageUrl} alt="favorite movie photo" />
                    <h2>{movie.Title}</h2>
                    <p>{movie.Description}</p>
                    <button onClick={() => removeFav(movie._id)}>Remove</button>
                  </div>
                ))
              ) : (
                <>
                  <h3>Add a new favorite movie to your list!</h3>
                  <a href="http://localhost:1234/movies">
                    <button className="see-movies">See Movies</button>
                  </a>
                </>
              )
            ) : (
              <div>
                <button onClick={callMovies}>Show movies</button>
              </div>
            )}
          </div>
          <button className="danger" onClick={() => setDeleteConfirm(true)}>
            Delete Profile
          </button>
          {confirm && (
            <div className="backdrop">
              <div className="confirmation">
                <p>
                  Are you sure you wish to change your username to {newUsername}
                  ? You will be logged out.
                </p>
                <button className="bad" onClick={submitUsername}>
                  Yes
                </button>
                <button onClick={() => setConfirm(false)}>No</button>
              </div>
            </div>
          )}
          {deleteConfirm && (
            <div className="backdrop">
              <div className="confirmation">
                <p>Are you sure you want to delete your account?</p>
                <button className="bad" onClick={deleteUser}>
                  Yes
                </button>
                <button onClick={() => setDeleteConfirm(false)}>No</button>
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
