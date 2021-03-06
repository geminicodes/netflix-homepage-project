import React from 'react';
import Row from './Row';
import requests from './requests';
import Banner from './Banner';
import Nav from './Nav';
import Footer from './Footer';
import './App.css';

// fetchUrl - url information is pulled from. here different rows have different urls.
function App() {
  return (
    <div className='app'>
      <Nav />
      <Banner />
      <Row
        title='NETFLIX ORIGINALS'
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title='Trending Now' fetchUrl={requests.fetchTrending} />
      <Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
      <Row title='Action' fetchUrl={requests.fetchActionMovies} />
      <Row title='Comedy' fetchUrl={requests.fetchComedyMovies} />
      <Row title='Horror' fetchUrl={requests.fetchHorrorMovies} />
      <Row title='Romance' fetchUrl={requests.fetchRomanceMovies} />
      <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />
      <Footer />
    </div>
  );
}

export default App;

