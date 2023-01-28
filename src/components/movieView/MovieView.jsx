import { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import Axios from "axios";
import "./movieView.scss";

const MovieView = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const title = document.URL.split("/").pop();
    const productionUrl = "https://my-flix-production.up.railway.app/";

    Axios.get(`${productionUrl}movies/${title}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {movie ? (
        <div className="container">
          <h2>{movie.Title}</h2>
          <p>{movie.Description}</p>
          <img src={movie.ImageUrl} />
        </div>
      ) : (
        <BounceLoader />
      )}
    </>
  );
};

export default MovieView;
