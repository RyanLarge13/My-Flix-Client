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
  const [selectedMovie, setSelectedMovie] = useState(false);

  return (
    <>
        {selectedMovie ? <MovieView movie={selectedMovie} onBackClick={(bool) => setSelectedMovie(bool)}/> : 
          movies.length === 0 ? <h1>No movies to show</h1> : movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => {setSelectedMovie(newSelectedMovie)}}/>
          ))}
    </>
  )
}

export default Mainview