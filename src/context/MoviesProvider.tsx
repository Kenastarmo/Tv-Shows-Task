import React, { useState } from 'react';
import MoviesContext from './MoviesContext';
import { Movie } from '../types';


// type Movie = {
//   id: number;
//   title?: string;
//   poster_path: string;
//   overview: string;
//   vote_average: number;
// };



type MoviesProviderProps = {
  children: React.ReactNode;
};

    export const MoviesProvider = ({ children }: MoviesProviderProps) => {

      //State
      const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
      const [movies, setMovies] = useState<Movie[]>([]);
      const [popularTvShows, setPopularTvShows] = useState<Movie[]>([]); 
      const [tvShows, setTvShows] = useState<Movie[]>([]); 
      const [category, setCategory] = useState<'movie' | 'tv'>('movie'); 
      const [searchTerm, setSearchTerm] = useState<string>(''); 
      const [page, setPage] = useState<number>(1); 


  return (
    <MoviesContext.Provider value={{ popularMovies, setPopularMovies, movies, setMovies, popularTvShows, setPopularTvShows,
     tvShows, setTvShows, category, setCategory, searchTerm, setSearchTerm, page, setPage }}>
      {children}
    </MoviesContext.Provider>
  );
};