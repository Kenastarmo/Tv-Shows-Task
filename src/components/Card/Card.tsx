import React from 'react'
import { Link } from 'react-router-dom'
import notfound from "../../assets/notfound.png"

type CardProps = {
    id: number,
    title?: string,
    original_name?:string,
    poster_path:string,
    category:string,
}

const Card = ({id, title, poster_path, category}: CardProps ) => {
    return (
         <Link to={`${category}/${id}`} className='link'>
            <div className='result-wrapper'>
                <img src={poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : notfound }
                 alt="" style={{minHeight:"300px", maxWidth:"200px"}}/>
                <p className="title">{title ? title : original_name}</p>
            </div>
         </Link>
    )
}

export default Card
