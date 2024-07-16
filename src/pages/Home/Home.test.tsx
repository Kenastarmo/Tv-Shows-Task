// Home.test.js

import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home'; // Adjust the path according to your project structure
import MoviesContext from '../../context/MoviesContext';

describe('Home', () => {
  it('renders without crashing and uses mocked data', async () => {
    // Provide initial state for the MoviesContext
    const initialState = {
      popularMovies: [],
      setPopularMovies: jest.fn(),
      movies: [],
      setMovies: jest.fn(),
      popularTvShows: [],
      setPopularTvShows: jest.fn(),
      tvShows: [],
      setTvShows: jest.fn(),
      category: 'movie',
      setCategory: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
    };

    // Render the Home component within the MoviesContext.Provider
    render(
      <MoviesContext.Provider value={initialState}>
        <Home />
      </MoviesContext.Provider>
    );

    // Assuming your mock data has been set up correctly, this should not throw an error
    // Add assertions here to check if the component behaves as expected with the mocked data
    // For example, checking if certain elements are present in the document
  });
});
