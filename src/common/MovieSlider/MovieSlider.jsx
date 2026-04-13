import React from 'react'
import "./MovieSlider.style.css";
import CarouselLib from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from "../MovieCard/MovieCard";

const Carousel = CarouselLib.default || CarouselLib;
const MovieSlider = ({title,movies,responsive}) => {
  return (
    <div>
        <h3>{title}</h3>
        <Carousel
  infinite={true}
  centerMode={false}
  responsive={responsive}
  itemClass="px-2"
  containerClass="carousel-container"
  
>
  {movies.map((movie,index)=><MovieCard movie={movie} key={index}/>)}
</Carousel>
    </div>
  );
};

export default MovieSlider;