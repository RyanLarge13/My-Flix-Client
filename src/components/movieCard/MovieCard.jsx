import { useState } from "react";
import elements from "../../styles/elements";
import { PropTypes } from "prop-types";

const MovieCard = ({ movie }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center p-5 mx-10 my-20 rounded-md shadow-md text-center">
        <img
          src={movie.ImageUrl}
          alt={`A background image for ${movie.Title}`}
          className="w-[324px] h-[480px] rounded-md shadow-md"
        />
        <h1 className="mt-5 text-xl font-bold">{movie.Title}</h1>
        <p className="my-5">{movie.Description}</p>
        <a href={`http://localhost:1234/movies/${movie.Title}`}>
          <button className={`${elements.greenButton}`}>View More</button>
        </a>
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
