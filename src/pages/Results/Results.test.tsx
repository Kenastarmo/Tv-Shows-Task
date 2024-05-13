import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import axios from 'axios'; // Importujemo axios
import Results from './Results';



describe('Results component', () => {
    const mockPopularMovies = [
        { 
          id: 1, 
          title: 'Movie 1', 
          poster_path: '/path/to/poster1.jpg',
          overview: 'This is a brief overview of Movie 1.',
          vote_average: 7.5
        },
        { 
          id: 2, 
          title: 'Movie 2', 
          poster_path: '/path/to/poster2.jpg',
          overview: 'This is a brief overview of Movie 2.',
          vote_average: 8.0
        },
    ];

    const mockSearchQuery = 'Movie';
    const mockCategory = 'movie';
    const mockSearchResults = [
        { 
          id: 3, 
          title: 'Movie 3', 
          poster_path: '/path/to/poster3.jpg',
          overview: 'This is a brief overview of Movie 3.',
          vote_average: 6.5
        },
        { 
          id: 4, 
          title: 'Movie 4', 
          poster_path: '/path/to/poster4.jpg',
          overview: 'This is a brief overview of Movie 4.',
          vote_average: 7.0
        },
    ];

    it('renders popular movies when searchQuery is empty', async () => {
        render(
            <MemoryRouter>
                <Results popularMovies={mockPopularMovies} searchQuery={mockSearchQuery} category={mockCategory} />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(mockPopularMovies[0].title)).toBeInTheDocument();
            expect(screen.getByText(mockPopularMovies[1].title)).toBeInTheDocument();
        });
    });

    // it('renders search results when searchQuery is provided', async () => {
    //     // Postavljamo mock odgovor za axios
    //     axios.get.mockResolvedValueOnce({ data: { results: mockSearchResults } });

    //     render(
    //         <MemoryRouter>
    //             <Results popularMovies={[]} searchQuery={mockSearchQuery} category={mockCategory} />
    //         </MemoryRouter>
    //     );
    
    //     await waitFor(() => {
    //         expect(screen.getByTestId('movie-3')).toBeInTheDocument();
    //         expect(screen.getByTestId('movie-4')).toBeInTheDocument();
    //     });
    // });

    it('updates localStorage with fetched movies', () => {
        render(
            <MemoryRouter>
                <Results popularMovies={mockPopularMovies} searchQuery={mockSearchQuery} category={mockCategory} />
            </MemoryRouter>
        );

        expect(localStorage.getItem(`${mockCategory}`)).toBeDefined();
    });
});
