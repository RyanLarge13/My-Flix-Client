import './movieView.scss';

const MovieView = ({ movie, onBackClick }) => {
  return (
    <>
    {movie ? (
      <div className='container'>
        <h2>{movie.Title}</h2>
        <p>{movie.Description}</p>
        <img src={movie.ImageUrl}/>
        <button onClick={() => onBackClick(false)}>Go Back</button>
      </div> ) : (
        <h1>No movie to show</h1>
      )}
    </>
  )
}

export default MovieView