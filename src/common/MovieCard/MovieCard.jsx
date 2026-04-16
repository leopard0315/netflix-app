import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import "./MovieCard.style.css"
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const MovieCard = ({movie}) => {

  const {data:genreData} = useMovieGenreQuery();
  const showGenre=(genreIdList)=>{
    if(!genreData) return []
    const genreNameList = genreIdList.map((id)=>{
      const genreObj = genreData.find((genre)=>genre.id === id)
      return genreObj.name;
    })
    return genreNameList;
  }

  const navigate = useNavigate();
  const goToMovieDetail = () =>{
    navigate(`/movies/${movie.id}`);
  }

  
  
  return (
    <div 
    onClick={goToMovieDetail}
    style={{backgroundImage : 
    `url(https://media.themoviedb.org/t/p/w600_and_h900_face${movie.poster_path})`,
    }}
    className="movie-card"
    >
      <div className="overlay">
        <h2 className="movie-title">{movie.title}</h2>
        <div className="attribute-group"> 
          {showGenre(movie.genre_ids).map((id)=>(<Badge className="genre-badge" bg="danger">{id}</Badge>))}
        </div>
        
        <div className="attribute-group info-row">
          <Badge className="info-badge" bg="success" text="dark">⭐ {movie.vote_average.toFixed(1)}</Badge>
          <Badge className="info-badge" bg="warning" text="dark"> {movie.adult ?`18+`:`ALL`}</Badge>
        </div>
        <div className="popularity-text">🔥{Math.floor(movie.popularity)}K</div>
      </div>
    </div>
  )
};

export default MovieCard;