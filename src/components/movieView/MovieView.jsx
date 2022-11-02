import React from 'react';
import './movieView.scss';

const MovieView = ({ movie, onBackClick }) => {
    // if (!movie) return <h1>No movies</h1>
  return (
    <>
      <div className='container'>
        <h2>{movie.Title}</h2>
        <h3>{movie.Description}</h3>
        <img src={movie.ImagePath}/>
        <button onClick={() => onBackClick(false)}>Go Back</button>
      </div>
    </>
  )
}

export default MovieView