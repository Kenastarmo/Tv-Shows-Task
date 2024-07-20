
import createAxiosInstance from "../createAxiosInstance";

async function getMoviesTvShowsOnQuery(category: string, searchQuery: string, page: number) {
    const response = await createAxiosInstance.get(`search/${category}?query=${searchQuery}&api_key=50f34a5a024fe46d03c9989497275a4a&page=${page}`);
    return response.data.results;
}   

async function getPopularMoviesTvShows(category: string, page: number) {
    const response = await createAxiosInstance.get(`${category}/popular?api_key=50f34a5a024fe46d03c9989497275a4a&page=${page}`);
    return response.data.results;

}

async function getOneMovieTvShow(category: string | undefined, id: string | undefined) {
    const response = await createAxiosInstance.get(`${category}/${id}?api_key=50f34a5a024fe46d03c9989497275a4a`);
    return response.data;
}

export default { getMoviesTvShowsOnQuery, getPopularMoviesTvShows, getOneMovieTvShow }