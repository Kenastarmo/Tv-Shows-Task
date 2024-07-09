import React, { useState, useEffect, useRef, useContext, Dispatch, SetStateAction } from 'react';
import { Movie } from '../../types';
import createAxiosInstance from "../../createAxiosInstance";
import fetchMoviesTvShows from "../../api/MoviesTvShows";
import LoaderCard from '../../components/LoaderCard/LoaderCard';
import Card from '../../components/Card/Card';
import Error from '../../components/Error/Error';
import useFetch from '../../hooks/useFetch';
import notfound from "../../assets/notfound.png"
import { MoviesProvider } from '../../context/MoviesProvider';
import MoviesTvShows from '../../api/MoviesTvShows';
import MoviesContext from '../../context/MoviesContext';
import { loadConfigFromFile } from 'vite';

type ResultsType = {
  currentCategory: Movie[];
  searchQuery: string;
  category: string;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

const Results = ({ currentCategory, searchQuery, category, searchTerm, setSearchTerm }: ResultsType) => {

  const { movies, setMovies, tvShows, setTvShows } = useContext(MoviesContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);

  useEffect(() => {

    if (searchQuery.length > 2) {
      
      const fetchQuery = async () => {
        
        try {
          setLoading(true);
          const response = await MoviesTvShows.getMoviesTvShowsOnQuery(category, searchQuery);
          console.log(response)
          if (category === 'movie') {
            setMovies(response)
          } else {
            setTvShows(response)
          }
        } catch (error) {
          console.error(`Failed to fetch Popular ${category}s`)
        } finally{
          setLoading(false);
        }

        setDisplay(true);
      }
      fetchQuery();
    }
    else {

      setDisplay(false)

    }

  }, [searchQuery, category])

  const results = display ? (category === "movie" ? movies : tvShows) : currentCategory;

  return (

    <div className='movies-wrapper'>
      {loading ? 
      <LoaderCard /> 
      : 
      (results.map((movie: Movie, index: number) => {
        return (
          <Card key={index}
            id={movie.id}
            title={movie.title ? movie.title : movie.original_name}
            poster_path={movie.poster_path}
            category={category}
          />
        )
      }))}

    </div>
  );
};

export default Results;