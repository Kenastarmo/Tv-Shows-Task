import { useEffect, useState } from 'react';
import MoviesContext from './context/MoviesContext';
import { useDebounce } from 'use-debounce';
import Results from './pages/Results/Results';
import { useContext } from 'react';
import createAxiosInstance from "./createAxiosInstance";
import './App.css'

function App() {

  const { popularMovies, setPopularMovies } = useContext(MoviesContext);

  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery] = useDebounce(inputValue, 1000);

  const initialCategory = localStorage.getItem('category') || "movie";
  const [category, setCategory] = useState<string>(initialCategory);


  const [loading, setLoading] = useState<boolean>(false);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>();

  console.log(loading, error);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const onInput = (e: any) => {
    const target = e.target;
    setInputValue(target.value);
  };

  const url = `${category}/popular?api_key=50f34a5a024fe46d03c9989497275a4a`;

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await createAxiosInstance.get(url);
        setPopularMovies(response.data.results);
        //console.log(response.data.results);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [category])

  const handleCategory = (category: any) => {
    setCategory(category);
    localStorage.setItem('category', category);
  };

  return (
    <>

      <div className='main-wrapper'>
        <div className='search-wrapper'>
          <div className='form-wrapper'>
            <div className='category-buttons'>
              <div className={`movies-btn ${category === "movie" ? "active" : ""}`} 
              onClick={() => { handleCategory("movie") }}>Movies</div>
              <div className={`series-btn ${category === "tv" ? "active" : ""}`} 
              onClick={() => { handleCategory("tv") }}>TV Shows</div>
            </div>

            <form method="post">
              <input
                type="search"
                id="search"
                placeholder='search...'
                name="query"
                list="search-suggestions"
                value={inputValue}
                onInput={onInput}
              />
            </form>

          </div>

        </div>
        <Results popularMovies={popularMovies} searchQuery={searchQuery} category={category} />
      </div>
    </>
  )
}

export default App
