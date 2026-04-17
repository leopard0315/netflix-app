import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const limit = 100;
  const isLongText = review.content.length > limit;
  const displayContent = isExpanded ? review.content : review.content.slice(0, limit) + (isLongText ? "..." : "");

  return (
    <div className="review-card">
      <h5 className="review-author">{review.author}</h5>
      
      <div className="review-body" style={{ display: 'flex', flexDirection: 'column' }}>
    <div className="review-content">
      {displayContent}
    </div>
    
    {isLongText && (
      <div className="mt-3"> 
        <Button 
          variant="danger" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="review-toggle-btn"
        >
          {isExpanded ? "Less" : "More"}
        </Button>
      </div>
    )}
  </div>
  
  <span className="review-date">{review.created_at.split('T')[0]}</span>
</div>
  );
};

export default ReviewCard;