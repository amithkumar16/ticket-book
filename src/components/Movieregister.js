import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Movieregister = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseDate: "",
    poster: "",
    rating: "",
    price: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/movies", formData);
      alert("🎉 Movie Registered Successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("❌ Error registering movie");
    }
  };

  return (
    // 1. Full-page background and centering
    <div className="flex justify-center items-center min-h-screen p-12 bg-gray-900">
      
      {/* 2. Form Container: A wide, transparent card centered on the screen */}
      {/* Using max-w-4xl and w-full ensures it uses a large portion of the screen */}
      <div className="bg-white/5 backdrop-blur-xl text-white p-16 rounded-3xl shadow-3xl w-full max-w-4xl border border-blue-500/30 transition-all duration-700 hover:shadow-blue-500/70">
        
        <h2 className="text-6xl font-extrabold mb-10 text-center tracking-wider bg-gradient-to-r from-teal-400 to-blue-300 bg-clip-text text-transparent">
          🌐 Global Movie Entry
        </h2>

        {/* 3. Grid for better spacing and alignment */}
        <form 
          onSubmit={handleSubmit} 
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12" // Increased gap for more space
        >
          
          {/* Title - Full Width for prominence */}
          <div className="group md:col-span-2">
            <label className="block mb-3 text-teal-400 font-bold text-lg">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter the official movie title..."
              value={formData.title}
              onChange={handleChange}
              // Enhanced focus/hover styles
              className="w-full p-4 rounded-xl bg-gray-800/90 border-2 border-slate-700 text-white placeholder-gray-500 text-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition duration-500 group-hover:border-teal-500"
              required
            />
          </div>

          {/* Description - Full Width */}
          <div className="group md:col-span-2">
            <label className="block mb-3 text-teal-400 font-bold text-lg">Description</label>
            <textarea
              name="description"
              placeholder="Provide a detailed plot summary or description."
              value={formData.description}
              onChange={handleChange}
              rows="5"
              // Enhanced focus/hover styles
              className="w-full p-4 rounded-xl bg-gray-800/90 border-2 border-slate-700 text-white placeholder-gray-500 text-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition duration-500 group-hover:border-teal-500"
              required
            ></textarea>
          </div>

          {/* Release Date - Left Column */}
          <div className="group">
            <label className="block mb-3 text-teal-400 font-bold text-lg">Release Date</label>
            <input
              type="text"
              name="releaseDate"
              placeholder="Example: Oct 20, 2026"
              value={formData.releaseDate}
              onChange={handleChange}
              // Enhanced focus/hover styles
              className="w-full p-4 rounded-xl bg-gray-800/90 border-2 border-slate-700 text-white placeholder-gray-500 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-500 group-hover:border-blue-500"
              required
            />
          </div>
          
          {/* Rating - Right Column */}
          <div className="group">
            <label className="block mb-3 text-teal-400 font-bold text-lg">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              placeholder="e.g., 4.8"
              min="1"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              // Enhanced focus/hover styles
              className="w-full p-4 rounded-xl bg-gray-800/90 border-2 border-slate-700 text-white placeholder-gray-500 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-500 group-hover:border-blue-500"
              required
            />
          </div>

          {/* Poster URL - Left Column */}
          <div className="group">
            <label className="block mb-3 text-teal-400 font-bold text-lg">Poster Image URL</label>
            <input
              type="url"
              name="poster"
              placeholder="Paste image link here (must be valid URL)"
              value={formData.poster}
              onChange={handleChange}
              // Enhanced focus/hover styles
              className="w-full p-4 rounded-xl bg-gray-800/90 border-2 border-slate-700 text-white placeholder-gray-500 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-500 group-hover:border-blue-500"
              required
            />
          </div>

          {/* Price - Right Column */}
          <div className="group">
            <label className="block mb-3 text-teal-400 font-bold text-lg">Ticket Price (₹)</label>
            <input
              type="number"
              name="price"
              placeholder="500"
              value={formData.price}
              onChange={handleChange}
              // Enhanced focus/hover styles
              className="w-full p-4 rounded-xl bg-gray-800/90 border-2 border-slate-700 text-white placeholder-gray-500 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-500 group-hover:border-blue-500"
              required
            />
          </div>

          {/* Submit Button - Full Width */}
          <button
            type="submit"
            className="md:col-span-2 mt-12 py-5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white text-2xl font-extrabold transition-all duration-300 shadow-2xl hover:shadow-blue-500/70 transform hover:-translate-y-2"
          >
            🎬 Finalize Movie Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default Movieregister;