import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './requests';
import './Banner.css';

function Banner() {
  /* random movie selected at the top of the page */
  const [movie, setMovie] = useState([]);
  /* run once when banner component loads */
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      /* select a random movie poster to be displayed as the header */
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  /* function to give the three dots when there's too much text */
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

    return (
        <header className='banner'
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
            backgroundPosition: 'center center',
          }}
        >
          <div className='banner__contents'>
            <h1 className='banner__title'>
              {movie?.title || movie?.name || movie?.original_name}
            </h1>

            <div className='banner__buttons'>
              <button className='banner__button'>Play</button>
              <button className='banner__button'>My List</button>
            </div>

            <h1 className='banner__description'>
              {truncate(movie?.overview, 150)}
            </h1>
          </div>

          <div className='banner--fadeBottom' />
        </header>
    );
}

export default Banner;

/* the stuff between <h1></h1> are edge cases that are taken care of
 a clean way to write this instead of a giant if else statements block */
