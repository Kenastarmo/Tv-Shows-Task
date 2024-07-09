export const getPopularMoviesTvShows = jest.fn().mockImplementation((category) => {
    switch (category) {
      case 'movie':
        return Promise.resolve({ data: [] }); // Replace [] with your mock movie data
      case 'tv':
        return Promise.resolve({ data: [] }); // Replace [] with your mock TV show data
      default:
        return Promise.reject(new Error('Invalid category'));
    }
  });