import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MovieList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/movies");
      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Loading movies...</h2>;
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>🎬 Movie Ticket Booking</h1>

      {/* Top Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>
        <button
          onClick={() => navigate("/register")}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          ➕ Register New Movie
        </button>

        <button
          onClick={() => navigate("/booking")}
          style={{
            backgroundColor: "#FF9800",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          🎫 My Bookings
        </button>
      </div>

      {/* Movie Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20,
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie._id}
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: 15,
              textAlign: "center",
            }}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              style={{
                width: "100%",
                height: 300,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <h2 style={{ margin: "15px 0 5px" }}>{movie.title}</h2>
            <p>Price: ₹{movie.price}</p>

            <button
              onClick={() => navigate("/movie-booking", { state: { movie } })}
              style={{
                backgroundColor: "#3399cc",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
