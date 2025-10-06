import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const MovieBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve movie object sent from MovieList
  const movie = location.state?.movie;

  const [tickets, setTickets] = useState(1);

  if (!movie) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h2>Movie not found ❌</h2>
        <button onClick={() => navigate("/")}>Back to Movies</button>
      </div>
    );
  }

  // Calculate total price
  const totalPrice = movie.price * tickets;

  // Razorpay payment handler
  const handlePayment = async () => {
    try {
      // Call backend to create an order
      const { data } = await axios.post("http://localhost:5000/order", {
        amount: totalPrice, // send total amount in backend
      });

      const options = {
        key: "rzp_test_RMtSJrqLRLOsg6", // your Razorpay Key
        amount: data.amount, // amount from backend in paise
        currency: data.currency,
        name: "Movie Booking",
        description: `Booking for ${movie.title} (${tickets} tickets)`,
        order_id: data.id, // order id from backend
        handler: async function (response) {
        try {
          // 🔹 Save booking to backend
          const bookingData = {
            movieId: movie._id,
            movieTitle: movie.title,
            poster: movie.poster,
            tickets: tickets,
            totalPrice: totalPrice,
            paymentId: response.razorpay_payment_id,
            userId: "demoUser", // replace with actual logged-in user ID
          };

          await axios.post("http://localhost:5000/api/bookings", bookingData);

          alert(
            `🎉 Payment Successful!\nMovie: ${movie.title}\nTickets: ${tickets}\nPayment ID: ${response.razorpay_payment_id}\nAmount Paid: ₹${totalPrice}`
          );
          navigate("/"); // redirect to movie list
        } catch (err) {
          console.error("Error saving booking:", err);
          alert("Payment succeeded but failed to save booking!");
        }
      },
        prefill: {
          name: "Amith",
          email: "amith@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial, sans-serif",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        🎟 Booking for {movie.title}
      </h1>

      <div
        style={{
          display: "flex",
          gap: 20,
          backgroundColor: "#fff",
          borderRadius: 10,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: 20,
        }}
      >
        {/* Movie Poster */}
        <img
          src={movie.poster}
          alt={movie.title}
          style={{
            width: "300px",
            height: "400px",
            objectFit: "cover",
            borderRadius: 10,
          }}
        />

        {/* Booking Form */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 18 }}>Price per ticket: ₹{movie.price}</p>

          <label style={{ fontWeight: "bold" }}>Number of Tickets:</label>
          <input
            type="number"
            min="1"
            value={tickets}
            onChange={(e) => setTickets(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              margin: "10px 0 20px",
              borderRadius: 6,
              border: "1px solid #ccc",
              fontSize: 16,
            }}
          />

          <p style={{ fontSize: 18, fontWeight: "bold" }}>
            Total Price: ₹{totalPrice}
          </p>

          <button
            onClick={handlePayment}
            style={{
              backgroundColor: "#3399cc",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 16,
              width: "100%",
            }}
          >
            Pay ₹{totalPrice}
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: 20,
              backgroundColor: "#ccc",
              color: "#000",
              border: "none",
              padding: "10px 20px",
              borderRadius: 8,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Back to Movies
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieBooking;
