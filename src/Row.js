import React, { useState, useEffect } from 'react';
import './Row.css';
import axios from './axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

// needed url for appending images from TMDB
const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
  // state keeps track of all those movies. (state is like short term memory - disappears on refresh)
  const [movies, setMovies] = useState([]);
  // capture youtube trailer url when clicked on poster thumbnail
  const [trailerUrl, setTrailerUrl] = useState('');

  // code snippet which runs based on a condition or variable
  // -> when Row loads, pull information from TMDB when code snippet runs and feed Row.
  useEffect(() => {
    // if [], run once when the row loads.
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  /* from the documentation of react-youtube */
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  /* user clicks on thumbnail, movie is passed on */
  const handleClick = (movie) => {
    /* if the trailer is already open, close it */
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      /* from npm module - takes name (of movie or tv show) and tries to find a trailer on youtube for it */
      movieTrailer(movie?.name || '')
      .then((url) => {
        /* catch youtube url */
        const urlParams = new URLSearchParams(new URL(url).search);
        // https://www.youtube.com/watch?v=XtMThy8QKqU -> gets value of v
        setTrailerUrl(urlParams.get('v'));
      })
      .catch((error) => console.log(error));
    }
  };

    return (
        <div className='row'>
          <h2>{title}</h2>
            <div className='row__posters'>

              {movies.map((movie) => (
                <img
                  key={movie.id}
                  onClick={() => handleClick(movie)}
                  className={ `row__poster ${isLargeRow && 'row__posterLarge'}`}
                  src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.name}
                  />
              ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

/* key={movie.id} -> if anything changes in the row, react will not re-render the entire row, only re-renders what it needs to */
/* this is very much needed when there are a bunch of stuff to be rendered and re-rendered on a page. optimization. */

/* movie.poster_path is the large poster images, while movie.backdrop_path are the wider ones */
export default Row;
