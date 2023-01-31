import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Axios from "axios";
import Navigation from "../navigation/Navigation";
import MovieCard from "../movieCard/MovieCard";
import MovieView from "../movieView/MovieView";
import LoginView from "../loginView/LoginView";
import RegisterView from "../registerView/RegisterView";
import Profile from "../profile/Profile";
import "./mainView.scss";

const Mainview = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(false);
  const productionUrl = "https://my-flix-production.up.railway.app/";
  const devUrl = "http://localhost:8080/";

  useEffect(() => {
    const username = localStorage.getItem("Username");
    const token = localStorage.getItem("Token");
    fetchMovies();

    if (!token || !username) return;

    fetchUser(username, token);
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

  const fetchUser = (username, token) => {
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

  return (
    <BrowserRouter>
      <Navigation user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {user ? (
                <Navigate to="/movies" />
              ) : (
                <Col md={5}>
                  <RegisterView />
                </Col>
              )}
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              {user ? (
                <Navigate to="/movies" replace />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={(user) => login(user)} />
                </Col>
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
                    <>
                      <section className="movies-container">
                        {movies.map((movie) => (
                          <MovieCard key={movie._id} movie={movie} />
                        ))}
                      </section>
                    </>
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
                <Col>
                  <Profile user={user} />
                </Col>
              )}
            </>
          }
        />
        <Route
          path="/logout"
          element={<LoginView onLoggedIn={(user) => login(user)} />}
        />
        <Route path="/movies/:title" element={<MovieView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Mainview;
