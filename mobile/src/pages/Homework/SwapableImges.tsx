import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './SwapableImages.css';



const SwapableImages = ({images = []}:any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction:any) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else if (direction === 'right') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
  });

  const renderImages = () => {
    if (images.length === 1) {
      return (
        <div className="image-wrapper g-justify-center">
          <img src={images[0]} alt="current" className="main-image" />
        </div>
      );
    } else if (images.length === 2) {
      return (
        <div className="image-wrapper">
            <div style={{width:'10%'}}></div>
          <img src={images[currentIndex]} alt="current" className="main-image" />
          <img src={images[(currentIndex + 1) % images.length]} alt="next" className="next-image" />
          <div style={{width:'10%'}}></div>
        </div>
      );
    } else if (images.length > 2) {
      return (
        <div className="image-wrapper">
          <img
            src={images[(currentIndex - 1 + images.length) % images.length]}
            alt="prev"
            className="prev-image"
          />
          <img src={images[currentIndex]} alt="current" className="main-image" />
          <img
            src={images[(currentIndex + 1) % images.length]}
            alt="next"
            className="next-image"
          />
        </div>
      );
    }
  };

  return (
    <div className="slider-container" {...handlers}>
      {renderImages()}
    </div>
  );
};

export default SwapableImages;
