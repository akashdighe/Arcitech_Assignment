// MoviePopup.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './MoviePopup.css';

const MoviePopup = ({ movie, onClose }) => {
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 500);
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!movie) {
    return null;
  }

  const { title, poster_path, overview, release_date } = movie;

  // Display the first 30 words of the overview
  const shortOverview = overview.split(' ').slice(0, 30).join(' ');

  return ReactDOM.createPortal(
    <div className="movie-popup-overlay">
      <div className={`movie-popup ${isSmallScreen ? 'small-screen' : ''}`}>
        <button className='closeBtn' onClick={onClose}>X</button>
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
        <div>
          <h3>{title}</h3>
          <p><span className='titleHeading'>Release Date</span>: {release_date}</p>
          {isSmallScreen ? (
            <div>
              <p><span className='titleHeading'>Overview</span>: {showFullOverview ? overview : `${shortOverview}...`}</p>
              {overview.split(' ').length > 30 && (
                <span className='showMore' onClick={() => setShowFullOverview(!showFullOverview)}>
                  {showFullOverview ? 'Show Less' : 'Show More'}
                </span>
              )}
            </div>
          ) : (
            <p><span className='titleHeading'>Overview</span>: {showFullOverview ? overview : `${shortOverview}...`}
              {overview.split(' ').length > 30 && (
                <span className='showMore' onClick={() => setShowFullOverview(!showFullOverview)}>
                  {showFullOverview ? 'Show Less' : 'Show More'}
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MoviePopup;
