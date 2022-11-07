import React, { useState, useEffect } from 'react';
import { BounceLoader } from 'react-spinners';
import axios from 'axios';
import MovieCard from '../movieCard/MovieCard';
import MovieView from '../movieView/MovieView';
import LoginView from '../loginView/LoginView';
import RegisterView from '../registerView/RegisterView';
import './mainView.scss';

const Mainview = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [user, setUser] = useState(false);
  
  useEffect(() => {
    axios.get('https://ryans-flix.herokuapp.com/movies')
    .then((res) => {
      setMovies(res.data);
    })
    .catch((err) => console.log(err));
  }, []);
  
  const onLoggedin = (user) => {
    setUser(user);
  };
  
  if (!user) return <LoginView onLoggedin={user => onLoggedin(user)} />

  return (
    <>
        {selectedMovie ? <MovieView movie={selectedMovie} onBackClick={(bool) => setSelectedMovie(bool)}/> : 
          movies.length === 0 ? <BounceLoader /> : movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => {setSelectedMovie(newSelectedMovie)}}/>
          ))
          }
    </>
  )
}

export default Mainview;