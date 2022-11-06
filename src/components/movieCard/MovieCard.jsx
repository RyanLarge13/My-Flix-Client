import React from 'react'
import { PropTypes } from 'prop-types';
import './movieCard.scss';

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <>
      <div className='movie'>
        <img src={movie.ImagePath} alt={`A background image for ${movie.Title}`} />
        <h1>{movie.Title}</h1>
        <p>{movie.Description}</p>
        <button onClick={() => onMovieClick(movie)}>View More</button>
      </div>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired 
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

export default MovieCard;