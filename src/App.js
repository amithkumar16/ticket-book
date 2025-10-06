import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieBooking from "./components/MovieBooking";
import Movieregister from "./components/Movieregister";
import Moviebooked from "./components/Moviebooked";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie-booking" element={<MovieBooking />} />
        <Route path="/register" element={<Movieregister />} />
        <Route path="/booking" element={<Moviebooked />} />
      </Routes>
    </Router>
  );
}

export default App;
