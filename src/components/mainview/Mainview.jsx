import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../movieCard/MovieCard';
import MovieView from '../movieView/MovieView';
import './mainView.scss';

const Mainview = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(false);

  useEffect(() => {
    axios.get('https://ryans-flix.herokuapp.com/movies')
    .then((res) => {
      setMovies(res.data);
    })
    .catch((err) => console.log(err))
  }, [movies])

  return (
    <>
        {selectedMovie ? <MovieView movie={selectedMovie} onBackClick={(bool) => setSelectedMovie(bool)}/> : 
          movies.length === 0 ? <h1>No movies to show</h1> : movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => {setSelectedMovie(newSelectedMovie)}}/>
          ))
          }
    </>
  )
}

export default Mainview