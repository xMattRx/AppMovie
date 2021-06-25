/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Movie from './components/Movie/Movie';


const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=df7ac8100f0dbc1e726f955647170d0a&page=1";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=df7ac8100f0dbc1e726f955647170d0a&query="



function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getMovies(FEATURED_API)
  }, [])

  const getMovies = (API) => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setMovies(data.results);
      });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm('')
    }
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input onChange={handleOnChange} value={searchTerm} className="search" type="search" placeholder="Search..." />
        </form>
      </header>
      <div className="movie-container" >

        {movies.length > 0 && movies.map((movie) => {
          return <Movie key={movie.id} {...movie} />
        })}
      </div>
    </>
  );
}

export default App;
