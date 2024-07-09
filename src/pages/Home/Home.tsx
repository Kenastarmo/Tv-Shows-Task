import { useEffect, useState } from 'react';
import MoviesContext from '../../context/MoviesContext';
import { useDebounce } from 'use-debounce';
import Results from '../Results/Results';
import { useContext } from 'react';
//import createAxiosInstance from "./createAxiosInstance";
import MoviesTvShows from '../../api/MoviesTvShows';
//import './App.css'
import '../../App.css';

function Home() {

  //States
  const { popularMovies, setPopularMovies, movies, setMovies, popularTvShows, setPopularTvShows,
  tvShows, setTvShows, category, setCategory, searchTerm, setSearchTerm } = useContext(MoviesContext);
  const [handlerEmptyArray, setHandlerEmptyArray] = useState<boolean>(true);
  const [searchQuery] = useDebounce(searchTerm, 1000);

  //const [category, setCategory] = useState<string>("");

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const onInput = (e: any) => {
    const target = e.target;
    setSearchTerm(target.value);
  };


  const handleEmpty = () => {
      if(movies.length > 0){
      setHandlerEmptyArray(false);
      }

      if(tvShows.length > 0){
        setHandlerEmptyArray(false);
        }
  }

useEffect(() => {
  const FetchOnmount = async () => {
    if(handlerEmptyArray){
      try {
        const response = await MoviesTvShows.getPopularMoviesTvShows(category)
        if(category === 'movie'){
          setPopularMovies(response);
        }else{
          setPopularTvShows(response);
        }
        
      } catch (error) {
        console.error(`Failed to fetch Popular ${category}s`);
      }
    }
    
  }
  FetchOnmount();
  handleEmpty();
}, [category])


//Handler for category
  const handleCategory = (category: any) => {
    setCategory(category);
  };

  return (
    <>
      <div className='main-wrapper'>
        <div className='search-wrapper'>
          <div className='form-wrapper'>
            <div className='category-buttons'>
              <div className={`movies-btn ${category === "movie" ? "active" : ""}`} 
              onClick={() =>  handleCategory("movie") }>Movies</div>
              <div className={`series-btn ${category === "tv" ? "active" : ""}`} 
              onClick={() =>  handleCategory("tv") }>TV Shows</div>
            </div>

            <form method="post">
              <input
                type="search"
                id="search"
                placeholder='search...'
                name="query"
                list="search-suggestions"
                value={searchTerm}
                onInput={onInput}
              />
            </form>

          </div>

        </div>
        <Results currentCategory={category === 'movie' ? popularMovies : popularTvShows} 
        searchQuery={searchQuery} 
        category={category} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm} 
         />
      </div>
    </>
  )
}

export default Home;
