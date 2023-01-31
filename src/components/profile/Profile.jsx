import { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import Axios from "axios";
import "./profile.scss";

const Profile = () => {
  const [user, setUser] = useState(false);

  const token = localStorage.getItem("Token");
  const username = localStorage.getItem("Username");

  useEffect(() => {
    const productionUrl = "https://my-flix-production.up.railway.app/";

    Axios.get(`${productionUrl}users/${username}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

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
          <div className="favorite-movies">
            {user.FavoriteMovies.length > 0 ? (
              user.FavoriteMovies.map((movie, index) => (
                <div key={index}>
                  <img src={movie.ImageUrl} alt="favorite movie photo" />
                  <h2>{movie.Title}</h2>
                  <p>{movie.Description}</p>
                  <button>Remove</button>
                </div>
              ))
            ) : (
              <>
                <h3>Add a new favorite movie to your list!</h3>
                <a href="http://localhost:1234/movies">
                  <button className="see-movies">See Movies</button>
                </a>
              </>
            )}
          </div>
          <button className="danger">Delete Profile</button>
        </div>
      ) : (
        <DotLoader />
      )}
    </section>
  );
};

export default Profile;
