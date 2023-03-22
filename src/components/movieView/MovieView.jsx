import { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import elements from "../../styles/elements";
import Axios from "axios";

const MovieView = ({ user }) => {
  const [movie, setMovie] = useState(null);
  const [favorite, setFavorite] = useState(false);

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

  useEffect(() => {
    if (movie && user) {
      if (user.FavoriteMovies.includes(movie._id)) {
        setFavorite(true);
      }
    }
  }, [movie]);

  const addFavorite = (id) => {
    setFavorite(true);
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

  const removeFav = (id) => {
    setFavorite(false);
    Axios.delete(`${productionUrl}${user.Username}/movies/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {movie ? (
        <section className="flex flex-col justify-center items-center mt-20 p-5 text-center">
          <img
            src={movie.ImageUrl}
            alt="movie"
            className="w-[432px] h-[640px] rounded-md shadow-md"
          />
          <h2 className="mt-5 text-xl font-bold">{movie.Title}</h2>
          <p className="m-5">{movie.Description}</p>
          <button>
            {favorite ? (
              <AiFillStar
                className="text-yellow-400"
                onClick={() => removeFav(movie._id)}
              />
            ) : (
              <AiOutlineStar
                className="text-yellow-400"
                onClick={() => addFavorite(movie._id)}
              />
            )}
          </button>
        </section>
      ) : (
        <BounceLoader />
      )}
    </>
  );
};

export default MovieView;
