import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { BounceLoader } from "react-spinners";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const MovieView = ({ user }) => {
  const [movie, setMovie] = useState(null);
  const [favorite, setFavorite] = useState(false);

  const token = localStorage.getItem("Token");
  const username = localStorage.getItem("Username");
  const { title } = useParams();
  const productionUrl = "https://my-flix-production.up.railway.app/";

  useEffect(() => {
    Axios.get(`${productionUrl}movies/${title}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (movie && user.FavoriteMovies) {
      if (user.FavoriteMovies.includes(movie._id)) {
        setFavorite(true);
      }
    }
  }, [movie]);

  const addFavorite = (id) => {
    setFavorite(true);
    Axios.post(
      `${productionUrl}users/${username}/movies/${id}`,
      {
        Accept: "application/json",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        toast("Favorite Movie Added", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => console.log(err));
  };

  const removeFav = (id) => {
    setFavorite(false);
    Axios.delete(`${productionUrl}${user.Username}/movies/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        toast("Favorite Movie Removed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {movie ? (
        <section className="flex flex-col justify-center items-center mt-20 p-5 text-center">
          <img
            src={movie.ImageUrl}
            alt="movie"
            className="w-[432px] h-[640px] rounded-md shadow-md"
          />
          <div className="p-5 rounded-md shadow-md bg-[#222222] text-white mt-5 mx-auto">
            <h2 className="mt-5 text-xl font-bold">{movie.Title}</h2>
            <p className="m-5 mb-10">{movie.Description}</p>
            <button className="text-5xl">
              {favorite ? (
                <AiFillStar
                  className="text-yellow-400"
                  onClick={() => removeFav(movie._id)}
                />
              ) : (
                <AiOutlineStar
                  className="text-yellow-400"
                  onClick={() => addFavorite(movie._id)}
                />
              )}
            </button>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />
        </section>
      ) : (
        <BounceLoader />
      )}
    </>
  );
};

export default MovieView;
