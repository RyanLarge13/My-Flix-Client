import React, { useState } from 'react';

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

  return (
    <>
        {movies.length === 0 ? <h1>No movies to show</h1> : movies.map((movie) => (
          <div key={movie._id}>
          <hi>{movie.Title}</hi>
          <p>{movie.Description}</p>
          <img src={movie.ImagePath} alt="image" />
          </div>
        ))}
    </>
  )
}

export default Mainview