import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
//import createAxiosInstance from "../../createAxiosInstance"
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import MoviesTvShows from "../../api/MoviesTvShows";
import LoaderCard from "../../components/LoaderCard/LoaderCard";

// type DetailsProps = {
//   id: number;
//   title: string;
//   poster_path: string;
//   overview: string;
//   vote_average: number;
// }

const Details = () => {
  const [data, setData] = useState<object>({})
  const [loading, setLoading] = useState<boolean>(false)
    /* eslint-disable @typescript-eslint/no-explicit-any */

  const [error, setError] = useState<any>()
  
  if(error){
    console.log(error)
  }

  const { category, id } = useParams();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await MoviesTvShows.getOneMovieTvShow(category, id);
        setData(response)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, []);

  if(loading){
    return <Loader />
  }

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.98),rgba(0,0,0,0.8) ,rgba(0,0,0,0.4)),url('https://image.tmdb.org/t/p/original/${(data as { backdrop_path: string }).backdrop_path}'`,
    backgroundPosition: "top",
    backgroundSize: "cover",
  }

  return (

    <div className='details-main-wrapper' style={backgroundStyle}>

      
      {loading ? <Loader /> :
        <div className='details-wrapper'>
        <div className='top'>
          <button className='back' onClick={handleGoBack}>Back</button>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img src={`https://image.tmdb.org/t/p/original/${(data as { backdrop_path: string }).backdrop_path}`} style={{ maxWidth: "600px" }}></img>
          </div>
          <div className='right'>
            <h2 className='details-title'>{(data as { original_title: string }).original_title ? 
            (data as { original_title: string }).original_title : 
            (data as { original_name: string }).original_name}</h2>
            <p className='details-overview'>{(data as { overview: string }).overview}</p>
          </div>
        </div>
      </div>
      }

    </div>
  )
}

export default Details