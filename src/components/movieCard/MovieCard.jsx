import React, { useState } from "react";
import { PropTypes } from "prop-types";
import MovieView from "../movieView/MovieView";
import Axios from "axios";
import "./movieCard.scss";

const MovieCard = ({ movie, addTitle }) => {
  const [title, setTitle] = useState(null);

  const setTitleState = (title) => {
    addTitle(title);
  };

  return (
    <>
      <div className="movie">
        <img
          src={movie.ImageUrl}
          alt={`A background image for ${movie.Title}`}
        />
        <h1>{movie.Title}</h1>
        <p>{movie.Description}</p>
        <button onClick={() => setTitleState(movie.Title)}>View</button>
      </div>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
