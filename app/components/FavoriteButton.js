'use client';

import { useEffect, useState } from 'react';

export default function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorite = localStorage.getItem('favorite');
    setIsFavorite(storedFavorite === 'true');
  }, []);

  const handleClick = () => {
    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite);
    localStorage.setItem('favorite', newFavorite);
  };

  return (
    <button onClick={handleClick}>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
}
