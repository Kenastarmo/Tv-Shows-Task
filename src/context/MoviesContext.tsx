import { createContext, Dispatch, SetStateAction } from 'react';
import { Movie } from "../types"

type MoviesContextType = {
  popularMovies: Movie[];
  setPopularMovies: Dispatch<SetStateAction<Movie[]>>;
  popularTvShows: Movie[];
  setPopularTvShows: Dispatch<SetStateAction<Movie[]>>;

  movies: Movie[];
  setMovies: Dispatch<SetStateAction<Movie[]>>;
  tvShows: Movie[];
  setTvShows: Dispatch<SetStateAction<Movie[]>>;

  category: string;
  setCategory: Dispatch<SetStateAction<'movie' | 'tv'>>;

  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

const MoviesContext = createContext<MoviesContextType>({
  popularMovies: [],
  setPopularMovies: () => { },
  popularTvShows: [],
  setPopularTvShows: () => { },
  movies: [],
  setMovies: () => { },
  tvShows: [],
  setTvShows: () => { },
  category: "",
  setCategory: () => { },
  searchTerm: "",
  setSearchTerm: () => { },
});

export default MoviesContext;