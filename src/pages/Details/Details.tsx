import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import createAxiosInstance from "../../createAxiosInstance"
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

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
  const [error, setError] = useState<any>()

  const { category, id } = useParams();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    const url = `${category}/${id}?api_key=50f34a5a024fe46d03c9989497275a4a`;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await createAxiosInstance.get(url);
        setData(response.data)
        console.log(response)
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
    backgroundImage: `linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.98),rgba(0,0,0,0.8) ,rgba(0,0,0,0.4)),url('https://image.tmdb.org/t/p/original/${data.backdrop_path}'`,
    backgroundPosition: "top",
    backgroundSize: "cover",
  }

  console.log(data)



  return (

    <div className='details-main-wrapper' style={backgroundStyle}>
      {loading ? <Loader /> :
        <div className='details-wrapper'>
        <div className='top'>
          <button className='back' onClick={handleGoBack}>Back</button>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} style={{ maxWidth: "600px" }}></img>
          </div>
          <div className='right'>
            <h2 className='details-title'>{data.original_title ? data.original_title : data.original_name}</h2>
            <p className='details-overview'>{data.overview}</p>
          </div>
        </div>
      </div>
      }

    </div>
  )
}

export default Details