'use client';

import React, { useState } from 'react';
import Rating from 'react-star-rating-component';

export function StarRating() {
  const [rating, setRating] = useState(0);
  const handleStarClick = (nextValue, prevValue, name) => {
    setRating(nextValue);
  };
  return (
    <div>
      <Rating
        value={rating}
        onStarClick={(nextValue, prevValue, name) =>
          handleStarClick(nextValue, prevValue, name)
        }
        starCount={5}
        starColor={'gold'}
        emptyStarColor={'#9932cc'}
      />
    </div>
  );
}
export default StarRating;
