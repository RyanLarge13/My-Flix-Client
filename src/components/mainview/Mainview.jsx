import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Navigation from "../navigation/Navigation";
import MovieCard from "../movieCard/MovieCard";
import MovieView from "../movieView/MovieView";
import LoginView from "../loginView/LoginView";
import RegisterView from "../registerView/RegisterView";
import Profile from "../profile/Profile";
import "./mainView.scss";

const Mainview = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    axios
      .get("my-flix-production.up.railway.app/movies")
      .then((res) => {
        setMovies(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const onLoggedin = (user) => {
    setUser(user);
  };

  // if (!user) return <LoginView onLoggedin={(user) => onLoggedin(user)} />;

  return (
    <BrowserRouter>
      <Navigation />
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
                <Navigate to="/movies" />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedin={(user) => onLoggedin(user)} />
                </Col>
              )}
            </>
          }
        />
        <Route
          path="/movies"
          elemet={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <>
                  {movies.length < 1 ? (
                    <Col>
                      <BounceLoader />
                    </Col>
                  ) : (
                    <Col md={8}>
                      {movies.map((movie) => (
                        <MovieCard
                          key={movie._id}
                          movie={movie}
                          onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                          }}
                        />
                      ))}
                    </Col>
                  )}
                </>
              )}
            </>
          }
        />
        <Route
          path="profile"
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
      </Routes>
    </BrowserRouter>
  );
};

export default Mainview;
