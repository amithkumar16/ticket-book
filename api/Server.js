// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import bodyParser from "body-parser";
import Booking from "./models/Booking.js";
import Movie from "./models/Movie.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// 🔹 Connect to MongoDB (optional for saving payments)
mongoose.connect("mongodb://localhost:27017/moviesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ Mongo Error:", err));


// 🔹 Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🔹 Order API

app.post('/api/movies', async (req,res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ message: "🎬 Movie Registered Successfully!", movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving movie" });
  }

})
app.post("/order", async (req, res) => {
  try {
    const {amount} = req.body
    const options = {
      amount:amount*100, // amount in paise (50000 = ₹500)
      currency: "INR",
      receipt: "receipt#1",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating order");
  }
});

app.post("/api/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking saved successfully!", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving booking" });
  }
});

app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies" });
  }
});

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }); 
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
