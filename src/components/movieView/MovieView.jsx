import { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import Axios from "axios";
import "./movieView.scss";

const MovieView = () => {
  const [movie, setMovie] = useState(null);

  const token = localStorage.getItem("Token");
  const username = localStorage.getItem("Username");
  const title = document.URL.split("/").pop();
  const productionUrl = "https://my-flix-production.up.railway.app/";
  const devUrl = "http://localhost:8080/";

  useEffect(() => {
    Axios.get(`${productionUrl}movies/${title}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addFavorite = (id) => {
    Axios.post(
      `${productionUrl}users/${username}/movies/${id}`,
      {
        Accept: "application/json",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {movie ? (
        <div className="container">
          <h2>{movie.Title}</h2>
          <p>{movie.Description}</p>
          <img src={movie.ImageUrl} />
          <button onClick={() => addFavorite(movie._id)}>
            Add To Favorites
          </button>
        </div>
      ) : (
        <BounceLoader />
      )}
    </>
  );
};

export default MovieView;
