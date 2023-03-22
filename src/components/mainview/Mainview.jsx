import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import Axios from "axios";
import MovieCard from "../movieCard/MovieCard";
import MovieView from "../movieView/MovieView";
import LoginView from "../loginView/LoginView";
import RegisterView from "../registerView/RegisterView";
import Profile from "../profile/Profile";
import Header from "../header/Header";

const Mainview = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(false);
  const [search, setSearch] = useState("");

  const username = localStorage.getItem("Username");
  const token = localStorage.getItem("Token");
  const productionUrl = "https://my-flix-production.up.railway.app/";
  const devUrl = "http://localhost:8080/";

  useEffect(() => {
    fetchMovies();

    if (!token || !username) return;

    fetchUser();
  }, []);

  const fetchMovies = () => {
    Axios.get(`${productionUrl}movies`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchUser = () => {
    Axios.get(`${productionUrl}users/${username}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };

  const login = (user) => {
    if (!user) return toast.error("No user. Try to signing in again.");
    setUser(user);
  };

  const searchMovies = (e) => {
    e.preventDefault();
    if (search === "") return fetchMovies();
    const searchedMovies = movies.filter((movie) =>
      movie.Title.includes(search)
    );
    setMovies(searchedMovies);
  };

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route
          path="/"
          element={<>{user ? <Navigate to="/movies" /> : <RegisterView />}</>}
        />
        <Route
          path="/login"
          element={
            <>
              {user ? (
                <Navigate to="/movies" replace />
              ) : (
                <LoginView onLoggedIn={(user) => login(user)} />
              )}
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <>
                  {movies.length < 1 ? (
                    <>
                      <BounceLoader />
                    </>
                  ) : (
                    <section>
                      <div className="flex justify-center items-center">
                        <input
                          onChange={(e) => setSearch(e.target.value)}
                          onKeyUp={(e) => searchMovies(e)}
                          placeholder="Search"
                          className="mt-20 px-3 py-1 rounded-md shadow-md"
                        />
                      </div>
                      {movies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                      ))}
                    </section>
                  )}
                </>
              )}
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <Profile user={user} />
              )}
            </>
          }
        />
        <Route
          path="/logout"
          element={<LoginView onLoggedIn={(user) => login(user)} />}
        />
        <Route path="/movies/:title" element={<MovieView user={user} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Mainview;
