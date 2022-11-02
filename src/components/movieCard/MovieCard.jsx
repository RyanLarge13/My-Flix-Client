import React from 'react'
import './movieCard.scss';

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <>
      <div className='movie'>
        <h1>{ movie.Title }</h1>
        <button onClick={() => onMovieClick(movie)}>View More</button>
      </div>
    </>
  )
}

export default MovieCard;