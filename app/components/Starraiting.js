'use client';

import React, { useState } from 'react';
import Rating from 'react-star-rating-component';

const KEY_PREFIX = 'location_';

export function StarRating({ locationId }) {
  const [rating, setRating] = useState(0);
  const handleStarClick = (nextValue, prevValue, name) => {
    setRating(nextValue);
    localStorage.setItem(KEY_PREFIX + locationId, nextValue.toString());
  };
  const savedRating = localStorage.getItem(KEY_PREFIX + locationId);
  if (savedRating) {
    var parsedRating = parseInt(savedRating);
    if (!isNaN(parsedRating)) {
      setRating(parsedRating);
    }
  }
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
