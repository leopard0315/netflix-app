import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usingPopularMovies';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import "./Banner.style.css";

const Banner = () => {
  const {data,isLoading,isError,error} = usePopularMoviesQuery();
  console.log("ddd",data);

  // 로딩 중일때
  if (isLoading){
    return (
      <div style={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  // 에러 발생시
  if(isError){
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // 데이터가 없다면 빈화면 return
  const movie = data?.results?.[0];
  if (!movie) {
    return <div style={{ height: '600px', backgroundColor: 'black' }}></div>;
  }

  return (
    <div style ={{
      backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_face/${data.results[0]?.poster_path})`,
      
    }}
    className="banner">
      
      <div style={{ paddingLeft: '50px', backgroundColor: 'rgba(0,0,0,0.4)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>{movie.title}</h1>
        <p style={{ maxWidth: '600px', fontSize: '1.2rem' }}>{movie.overview}</p>
      </div>
      </div>
  );
};

export default Banner;