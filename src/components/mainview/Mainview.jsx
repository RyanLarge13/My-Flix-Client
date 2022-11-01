import React, { useState } from 'react';
import MovieCard from '../movieCard/MovieCard';
import MovieView from '../movieView/MovieView';

const Mainview = () => {
  const [movies, setMovies] = useState([
      { _id: 1, Title: "Inception", Description: "desc1...", ImagePath: "..." },
      {
        _id: 2,
        Title: "The Shawshank Redemption",
        Description: "desc2...",
        ImagePath: "...",
      },
      { _id: 3, Title: "Gladiator", Description: "desc3...", ImagePath: "..." },
  ]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) return <MovieView movie={selectedMovie} />

  return (
    <>
        {movies.length === 0 ? <h1>No movies to show</h1> : movies.map((movie) => (
          <>
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newMovie) => setSelectedMovie(newMovie)}/>
          </>
        ))}
    </>
  )
}

export default Mainview