import React, { useState, useEffect, useRef, useContext, Dispatch, SetStateAction, useCallback } from 'react';
import { Movie } from '../../types';
import createAxiosInstance from "../../createAxiosInstance";
import fetchMoviesTvShows from "../../api/MoviesTvShows";
import LoaderCard from '../../components/LoaderCard/LoaderCard';
import Card from '../../components/Card/Card';
import Error from '../../components/Error/Error';
import useFetch from '../../hooks/useFetch';
import notfound from "../../assets/notfound.png"
import { MoviesProvider } from '../../context/MoviesProvider';
import MoviesTvShows from '../../api/MoviesTvShows';
import MoviesContext from '../../context/MoviesContext';
import { loadConfigFromFile } from 'vite';

type ResultsType = {
  currentCategory: Movie[];
  searchQuery: string;
  category: string;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  handlePage: () => void;
  filteringData: (oldData: any[], newData: any[]) => any[];
};

const Results = ({ currentCategory, searchQuery, category, searchTerm, setSearchTerm, page, setPage, handlePage, filteringData }: ResultsType) => {

  const { movies, setMovies, tvShows, setTvShows } = useContext(MoviesContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(false);



  
  const observer = useRef<IntersectionObserver | null>();
  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    //console.log(node)
    if(observer.current){
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMoreResults){
        //console.log(entries)
        // console.log("before increasing", page);
        // console.log("Sad nema skrola on top")
        //setPage(prev => prev + 1);
        handlePage();
        // console.log("after increasing", page);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    })

    if(node){
      observer.current.observe(node);
    }
  }, [hasMoreResults, loading])

//console.log(lastElementRef)







  useEffect(() => {
    // setPage(1);

    if (searchQuery.length > 2) {
      
      const fetchQuery = async () => {
        
        try {
          setLoading(true);
          const response = await MoviesTvShows.getMoviesTvShowsOnQuery(category, searchQuery, page);
          console.log(response)
          if (category === 'movie') {
            if(page > 1){
              //setMovies(prev => [...new Set([...prev, ...response])] );
              setMovies( prev => [...prev , ...filteringData(prev, response)] )
            }else{
              setMovies([...response]);
            }
            
          } else {
          
            if(page > 1){
              setTvShows( prev => [...prev , ...filteringData(prev, response)] )
            }else{
              setTvShows([...response]);
            }
          }
          console.log(response.length)
          setHasMoreResults(Boolean(response.length));
          console.log("response.length iznosi: " + response.length )
          console.log(hasMoreResults)
        } catch (error) {
          console.error(`Failed to fetch ${category}s`)
        } finally{
          setLoading(false);
        }
        setDisplay(true);
      }

    fetchQuery();
      
    }
    else {

      setDisplay(false)

    }

  }, [searchQuery, category, page])


  useEffect(() => {
    setPage(1)
  }, [searchQuery])



 //console.log("page" + page)


console.log(movies)

  const results = display ? (category === "movie" ? movies : tvShows) : currentCategory;


  return (

    <div className='movies-wrapper'>
      {loading ? 
      <LoaderCard /> 
      : 
      (results.map((movie: Movie, index: number) => {
       
          if(results.length === index + 1){
            return (
              <Card key={index}
                id={movie.id}
                title={movie.title ? movie.title : movie.original_name}
                poster_path={movie.poster_path}
                category={category}
                //forwardRef={lastElementRef}
                ref={index === results.length - 1 ? lastElementRef : null} 
              />
            )
          } else {
            return (
              <Card key={index}
                id={movie.id}
                title={movie.title ? movie.title : movie.original_name}
                poster_path={movie.poster_path}
                category={category}
                
              />
            )
          }
        
        
      }))}

    </div>
  );
};

export default Results;