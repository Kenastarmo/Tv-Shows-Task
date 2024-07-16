import { useEffect, useState } from 'react';
import MoviesContext from '../../context/MoviesContext';
import { useDebounce } from 'use-debounce';
import Results from '../Results/Results';
import { useContext } from 'react';
import MoviesTvShows from '../../api/MoviesTvShows';
import '../../App.css';

function Home() {

  //States
  const { popularMovies, setPopularMovies, movies, setMovies, popularTvShows, setPopularTvShows,
  tvShows, setTvShows, category, setCategory, searchTerm, setSearchTerm, page, setPage } = useContext(MoviesContext);
  const [handlerEmptyArray, setHandlerEmptyArray] = useState<boolean>(true);
  const [searchQuery] = useDebounce(searchTerm, 1000);
  // const [page, setPage] = useState<number | undefined>();
  console.log(page)


  //const [category, setCategory] = useState<string>("");

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const onInput = (e: any) => {
    const target = e.target;
    setSearchTerm(target.value);
  };


  const handlePage = () => {
    setPage(prev => prev + 1)
  }

  const handleEmpty = () => {
      if(movies.length > 0){
      setHandlerEmptyArray(false);
      }

      if(tvShows.length > 0){
        setHandlerEmptyArray(false);
        }
  }

console.log(" RE RENDRED -------")

// const filteringData = (oldData: any[], newData: any[]) => {
//   const oldDataIds = new Set(oldData.map(item => item.id));
//   return newData.filter(item => !oldDataIds.has(item.id))

// }
const filteringData = (oldData: any[], newData: any[]) => {
  const oldDataIds = new Set(oldData.map(item => item.id))
  return newData.filter(item => !oldDataIds.has(item.id))
}

useEffect(() => {
  //setPage(1);
  
  const FetchOnmount = async () => {
    if(handlerEmptyArray){
      try {
        const response = await MoviesTvShows.getPopularMoviesTvShows(category, page)
        if(category === 'movie'){
          // setPopularMovies( prev => [...new Set([...prev, ...response])] );
          setPopularMovies( prev => [...prev , ...filteringData(prev, response)] );

          //setPopularMovies(response);
        }else{
          //setPopularTvShows( prev => [...new Set([...prev, ...response])] );
          setPopularTvShows( prev => [...prev , ...filteringData(prev, response)] );

          //setPopularTvShows(response);
        }
        
      } catch (error) {
        console.error(`Failed to fetch Popular ${category}s`);
      }
    }
    
  }
  FetchOnmount();
  handleEmpty();
}, [category, page])


//console.log(popularMovies)

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
        page={page}
        setPage={setPage}
        handlePage={handlePage} 
        filteringData={filteringData}
         />
      </div>
    </>
  )
}

export default Home;
