import { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import Axios from "axios";

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
    <section>
      {user ? (
        <div>
          <h1 className="username">{user.Username}</h1>
          <div>
            {user.FavoriteMovies.length > 0 ? (
              user.FavoriteMovies.map((movie, index) => (
                <div key={movie._id}>
                  <img src={movie.ImageUrl} alt="favorite movie photo" />
                  <h2>{movie.Title}</h2>
                  <p>{movie.Description}</p>
                </div>
              ))
            ) : (
              <>
                <h2>Add a new favorite movie to your list!</h2>
                <a href="http://localhost:1234/movies">See Movies</a>
              </>
            )}
          </div>
        </div>
      ) : (
        <DotLoader />
      )}
    </section>
  );
};

export default Profile;
