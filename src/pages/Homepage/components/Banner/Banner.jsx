import React,{useState} from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import TrailerModal from '../../../../common/TrailerModal/TrailerModal';
import "./Banner.style.css";

const Banner = () => {
  const {data,isLoading,isError,error} = usePopularMoviesQuery();
  const [showTrailer,setShowTrailer] = useState(false);

  // 로딩 중일때 + 로딩스피너
  if (isLoading){
    return (
      <div className="banner loading-state">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }
  // 에러 발생시
  if(isError){
    return (<Alert variant="danger">{error.message}</Alert>);
  }
  // 데이터가 없다면 빈화면 return
  const movie = data?.results?.[0];
  if (!movie) {
    return null;
  }

  return (
    <div style ={{
      backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_face/${data.results[0]?.poster_path})`,
      
    }}
    className="banner">
      
      <div className ="banner-text-area">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p className="release-date">Release Date : {movie.release_date}</p>

        <div className="banner-button-group">
          <button 
          className="banner-btn play-btn"
          onClick={()=>setShowTrailer(true)}
          >
            ▶ Play
          </button>

          <TrailerModal 
        show={showTrailer} 
        onHide={() => setShowTrailer(false)} 
        movieId={movie.id} 
      />
          <button className="banner-btn info-btn">
            ⓘ Info
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Banner;