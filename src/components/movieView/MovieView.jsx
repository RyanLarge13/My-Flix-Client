import React, { useEffect } from 'react';
import './movieView.scss';

const MovieView = ({ movie, onBackClick }) => {
  return (
    <>
    {movie ? (
      <div className='container'>
        <h2>{movie.Title}</h2>
        <h3>{movie.Description}</h3>
        <img src={movie.ImagePath}/>
        <button onClick={() => onBackClick(false)}>Go Back</button>
      </div> ) : (
        <h1>No movie to show</h1>
      )}
    </>
  )
}

export default MovieView