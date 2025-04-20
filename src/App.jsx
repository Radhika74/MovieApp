import React, { useState } from 'react';
import './App.css';
const App = () => {
const [query, setQuery] = useState(''); // Store the search query
const [movie, setMovie] = useState(null); // Store the fetched movie data
const [error, setError] = useState(''); // Store error message
// Fetch movie data from OMDB API
const fetchMovie = async () => {
try {
// Make API request with the movie title entered by the user
const response = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=8d704d81`);
const data = await response.json();
// Handle the response: if movie not found, display error
if (data.Response === 'False') {
setError('Movie not found');
setMovie(null);
} else {
setMovie(data); // Set movie data to state
setError(''); // Clear error message
}
} catch (err) {
setError('Error fetching data');
}
};
return (
<div className="app-container">
<h1 className="header">Movie Search App</h1>
<input
type="text"
value={query}
onChange={(e) => setQuery(e.target.value)} // Update query as the user types
className="input"
placeholder="Search for a movie"
/>
<button onClick={fetchMovie} className="button">Search Movie</button>
{error && <p className="error">{error}</p>} {/* Display error message if any */}
{movie && ( // Display movie details if movie is found
<div className="movie-info">
<h2>{movie.Title}</h2>

<p>Release Date: {movie.Released}</p>
<p>Rating: {movie.imdbRating}</p>
<p>{movie.Plot}</p>
<img src={movie.Poster} alt={movie.Title} className="poster" />
</div>
)}
</div>
);
};
export default App;