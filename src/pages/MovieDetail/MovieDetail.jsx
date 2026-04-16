import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { Badge } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useMovieReviewsQuery } from '../../hooks/useMovieReviews';
import ReviewCard from './components/ReviewCard';
import { useRelatedMoviesQuery } from '../../hooks/useRelatedMovies';
import RelatedMovieSlide from './components/RelatedMoviesSlide/RelatedMoviesSlide';
import { Button } from 'react-bootstrap';
import TrailerModal from '../../common/TrailerModal/TrailerModal';
import "./MovieDetail.style.css";

const MovieDetail = () => {
  const {id} = useParams();
  const {data: reviews,isLoading:isReviewLoading} = useMovieReviewsQuery(id);
  const { data, isLoading, isError, error } = useMovieDetailQuery(id);
  const {data: relatData, isLoading:isRelatLoading} = useRelatedMoviesQuery(id);
  const [showTrailer, setShowTrailer] = useState(false);

   if(isLoading){
        return  <Spinner animation="border" variant="danger" />;
    };
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>
    };
  
  return (
    <div className="movie-detail-page">
      <div className="detail-content-area">

        {/* 왼쪽 - 포스터 */}
        <div className="content-poster">
          <img 
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`} 
            alt={data.title} 
          />
        </div>

        {/* 오른쪽 - 상세 정보 텍스트 */}
        <div className="content-info">
          <div className="detail-genres">
            {data.genres.map((genre) => (
              <Badge key={genre.id} bg="danger" className="detail-badge">{genre.name}</Badge>
            ))}
          </div>

          <h1 className="detail-title">{data.title}</h1>
          <p className="detail-tagline">“ {data.tagline} ”</p>

          <div className="detail-meta info-row">
            <Badge bg="success" text="dark" className="info-badge">⭐ {data.vote_average.toFixed(1)}</Badge>
            <Badge bg="warning" text="dark" className="info-badge">🧑‍🤝‍🧑 {data.popularity}</Badge>
            <Badge bg="warning" text="dark" className="info-badge">{data.adult ? `18+` : `ALL`}</Badge>
          </div>

          <Button 
              variant="light" 
              className="ms-4 play-btn" 
              onClick={() => setShowTrailer(true)}
            >
              ▶ Play
            </Button>

          <hr className="detail-divider"/> 
          <p className="detail-overview">{data.overview}</p>
          
          <hr className="detail-divider"/>

          <div className="detail-specs">
            <Badge bg="danger" className="detail-spec-badge">Budget</Badge> <span>$ {data.budget.toLocaleString()}</span>
            <Badge bg="danger" className="detail-spec-badge">Revenue</Badge> <span>$ {data.revenue.toLocaleString()}</span>
            <Badge bg="danger" className="detail-spec-badge">Release Date</Badge> <span>{data.release_date}</span>
            <Badge bg="danger" className="detail-spec-badge">Run time</Badge> <span>{data.runtime}분</span>
          </div>
        </div>
      </div>

      <TrailerModal 
        show={showTrailer} 
        onHide={() => setShowTrailer(false)} 
        movieId={id} 
      />

      <div className="reviews-section">
        <h2 className="section-title">Reviews ({reviews?.length})</h2>
        {isReviewLoading ? 
        (<Spinner animation="border" />) : reviews?.length > 0 ? (
          <div className="review-list">
            {reviews.map((review) => (
              <ReviewCard key={review.id} className="review-card" review={review}/>
            ))}
          </div>
        ) : (
          <p className="no-reviews">작성된 리뷰가 없습니다.</p>
        )}
      </div>

      <RelatedMovieSlide/>      
    </div>
    
  )
}

export default MovieDetail;