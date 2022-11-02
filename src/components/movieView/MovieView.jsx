import React from 'react'

const MovieView = ({ movie, onBackClick }) => {
    // if (!movie) return <h1>No movies</h1>
  return (
    <>
        <h2>{movie.Title}</h2>
        <h3>{movie.Description}</h3>
        <img src={movie.ImagePath}/>
        <button onClick={() => onBackClick(false)}>Go Back</button>
    </>
  )
}

export default MovieView