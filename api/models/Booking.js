// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  movieTitle: { type: String, required: true },
  poster: { type: String, required: true },
  tickets: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paymentId: { type: String, required: true },
  userId: { type: String, default: "demoUser" }, // you can replace with actual userId
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
