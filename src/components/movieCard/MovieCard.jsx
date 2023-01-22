import React from "react";
import { PropTypes } from "prop-types";
import "./movieCard.scss";

const MovieCard = ({ movie }) => {
  return (
    <>
      <div className="movie">
        <img
          src={movie.ImageUrl}
          alt={`A background image for ${movie.Title}`}
        />
        <h1>{movie.Title}</h1>
        <p>{movie.Description}</p>
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
