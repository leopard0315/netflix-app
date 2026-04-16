import React from 'react'
import { useRelatedMoviesQuery } from '../../../../hooks/useRelatedMovies';
import Alert  from 'react-bootstrap/Alert';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import { useParams } from 'react-router-dom';

const RelatedMovieSlide = () => {
    const {id} = useParams();
    const {data,isLoading,isError,error} = useRelatedMoviesQuery(id);
    if(isLoading){
        return 
    };
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>
    };
  return (
    <div>
        <MovieSlider 
        title="Related Movies" 
        movies={data?.results} 
        responsive={responsive}/>
    </div>
  );
};

export default RelatedMovieSlide;