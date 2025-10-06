import React, { useEffect, useState } from "react";
import axios from "axios";

const Moviebooked = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch booked movies from backend
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings"); 
      setBookings(response.data); // response.data should be an array of booked movies
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: 50 }}>Loading your bookings...</h2>;
  }

  if (bookings.length === 0) {
    return <h2 style={{ textAlign: "center", marginTop: 50 }}>You have no bookings yet!</h2>;
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>🎟 My Booked Tickets</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20,
        }}
      >
        {bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: 15,
              textAlign: "center",
            }}
          >
            <img
              src={booking.poster} // assuming booking has movie object inside
              alt={booking.title}
              style={{
                width: "100%",
                height: 300,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <h2 style={{ margin: "15px 0 5px" }}>{booking.title}</h2>
            <p>Tickets: {booking.tickets}</p>
            <p>Total Paid: ₹{booking.totalPrice}</p>
            <p>Booking Date: {new Date(booking.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Moviebooked;
