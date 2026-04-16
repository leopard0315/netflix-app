import React from 'react'
import { useParams } from 'react-router-dom';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { Badge } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useMovieReviewsQuery } from '../../hooks/useMovieReviews';
import ReviewCard from './components/ReviewCard';
import "./MovieDetail.style.css";

const MovieDetail = () => {
  const {id} = useParams();
  const {data: reviews,isLoading:isReviewLoading} = useMovieReviewsQuery(id);
  const { data, isLoading, isError, error } = useMovieDetailQuery(id);

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

      <div className="reviews-section">
        <h2 className="section-title">Reviews ({reviews?.length})</h2>
        {isReviewLoading ? 
        (<Spinner animation="border" />) : reviews?.length > 0 ? (
          <div className="review-list">
            {reviews.map((review) => (
              <ReviewCard key={review.id} className="review-card" review={review}/>
                // <h5 className="review-author">{review.author}</h5>
                // <p className="review-content">{review.content}</p>
                // <span className="review-date">{review.created_at.split('T')[0]}</span>
            ))}
          </div>
        ) : (
          <p className="no-reviews">작성된 리뷰가 없습니다.</p>
        )}
      </div>
    </div>
    
  )
}

export default MovieDetail;