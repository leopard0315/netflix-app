import React from 'react';
import { Modal } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { useMovieVideoQuery } from '../../hooks/useMovieVideo';
import "./TrailerModal.style.css";

const TrailerModal = ({ show, onHide, movieId }) => {

  const { data: videoData, isLoading } = useMovieVideoQuery(movieId);
  const opts = {
    height: '480',
    width: '100%',
    playerVars: {
      autoplay: 1, 
      mute: 0,     
    },
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="lg" 
      centered 
      contentClassName="bg-dark text-white" 
    >
      <Modal.Header closeButton closeVariant="white" className="border-secondary">
        <Modal.Title>Official Trailer</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0"> 
        {isLoading ? (
          <div className="text-center py-5">Loading...</div>
        ) : videoData ? (
          <YouTube videoId={videoData.key} opts={opts} />
        ) : (
          <div className="text-center py-5">NO Official Trailer</div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TrailerModal;