import { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import Axios from "axios";
import "./movieView.scss";

const MovieView = ({ title }) => {
  const [movie, setMovie] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:8080/movies/${title}`)
      .then((res) => setMovie(res.data.data))
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
