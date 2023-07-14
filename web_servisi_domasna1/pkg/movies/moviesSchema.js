const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "You muss enter a title"]
    },
    year: {
      type: Number,
    },
  
    director: {
      type: String,
      required: [true, "You must enter a director"]
    },
  
    imdbRating: {
      type: Number,
      default: 5,
    },
  
    metascore: {
      type: Number,
    }
  });
  
  const Movie = mongoose.model("Movie", movieSchema);
  
  module.exports = Movie;