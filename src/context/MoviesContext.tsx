// import React, { useState, createContext, Dispatch, SetStateAction } from 'react';

// type Movie = {
//     id: number;
//     title: string;
//     poster_path: string;
//     overview: string;
//     vote_average: number;
//   }

// type MoviesContextType = {
//     popularMovies: Movie[],
//     setPopularMovies: Dispatch<SetStateAction<Movie[]>>;
// }

// const MoviesContext = createContext<MoviesContextType>({
//   popularMovies: [],
//   setPopularMovies: () => {},
// });

// /* eslint-disable @typescript-eslint/no-explicit-any */
// export const MoviesProvider = ({ children }: any) => {
//   const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

//   return (
//     <MoviesContext.Provider value={{ popularMovies, setPopularMovies }}>
//       {children}
//     </MoviesContext.Provider>
//   );
// };

// export default MoviesContext;

import { createContext, Dispatch, SetStateAction } from 'react';
import { Movie } from "../types"

// type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
//   overview: string;
//   vote_average: number;
// };

type MoviesContextType = {
  popularMovies: Movie[];
  setPopularMovies: Dispatch<SetStateAction<Movie[]>>;
};

const MoviesContext = createContext<MoviesContextType>({
  popularMovies: [],
  setPopularMovies: () => {},
});

export default MoviesContext;