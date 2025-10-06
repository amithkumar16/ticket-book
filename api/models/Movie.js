import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  releaseDate: String,
  poster: String,
  rating: Number,
  price: { type: Number, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
