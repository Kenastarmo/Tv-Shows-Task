import React, { useState } from 'react';
import MoviesContext from './MoviesContext';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
};

type MoviesProviderProps = {
  children: React.ReactNode;
};

// export const MoviesProvider: React.FC<MoviesProviderProps> = ({ children }) => {
    export const MoviesProvider = ({ children }: MoviesProviderProps) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  return (
    <MoviesContext.Provider value={{ popularMovies, setPopularMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};