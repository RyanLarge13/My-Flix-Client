import React from 'react'

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <>
    <h1>{ movie.Title }</h1>
    <button onClick={onMovieClick(movie)}>Show Details</button>
    </>
  )
}

export default MovieCard