import React, { useState, useEffect } from 'react';
import { Movie } from '../../types';
import createAxiosInstance from "../../createAxiosInstance";
import LoaderCard from '../../components/LoaderCard/LoaderCard';
import Card from '../../components/Card/Card';
import Error from '../../components/Error/Error';

type MoviesType = {
  popularMovies: Movie[];
  searchQuery: string;
  category?: string;
};

const Results = ({ popularMovies, searchQuery, category }: MoviesType) => {

  const [movies, setMovies] = React.useState<object[]>(() => {
    const storedData = localStorage.getItem(`${category}`);
    return storedData ? JSON.parse(storedData) : [];
  });
  console.log(movies)
  
  const [displayMovies, setDisplayMovies] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>();
    /* eslint-disable @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>();



  useEffect(() => {
    if (searchQuery.length > 2) {
      const url = `search/${category}?query=${searchQuery}&api_key=50f34a5a024fe46d03c9989497275a4a`;
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await createAxiosInstance.get(url);
          // setMovies((prev:any) => [...prev, ...response.data.results]);
          console.log(response.data.results)
          setMovies(response.data.results)
        } catch (error) {
          setError(error);
          console.log(error)
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }else {
      setDisplayMovies(false); 
       // setMovies([])
      
      
    }
  }, [searchQuery, category]);
 // console.log(movies)

 const updateDisplayMovies = () => {
  if (movies.length === 0){
    //if(!localStorage.getItem(`${category}`)) {
    setDisplayMovies(false);
  } else {
    setDisplayMovies(true);
  }
}

useEffect(()=>{
  if(!localStorage.getItem(`${category}`)) {
    setMovies([]);
  }
}, [category])

useEffect(() => {
  updateDisplayMovies();
}, [movies, popularMovies, category]);




  // useEffect(() => {
  //   localStorage.setItem(`${category}`, JSON.stringify(movies));

  // }, [movies, category]);
  

  // const renderResults = (movie: Movie, index:number) => {
  //   return (
  //     <Card key={index} 
  //     id={movie.id} 
  //     title={movie.title ? movie.title : movie.original_name} 
  //     poster_path={movie.poster_path} 
  //     category={category} />
  //   );
  // }

  const renderResults: (value: Movie, index: number, array: Movie[]) => JSX.Element = (movie, index) => {
    return (
      <Card key={index} 
            id={movie.id} 
            title={movie.title? movie.title : movie.original_name} 
            poster_path={movie.poster_path} 
            category={category} />
    );
  }

  if(error){
    return <Error />
  }

  return (
    <div className='movies-wrapper'>
      
      {loading ? (
        <LoaderCard />
      ) : (
        <>
          {displayMovies? (movies as Movie[]).map(renderResults) : (popularMovies as Movie[]).map(renderResults)}
          
          {/* {displayMovies ? (movies.map(renderResults)) : (popularMovies.map(renderResults))} */}
        </>
      )}
    </div>
  );
};

export default Results;










