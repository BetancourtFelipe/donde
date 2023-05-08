'use client';

// import { useState } from 'react';

// export default function FavoriteButton() {
//   const [isFavorite, setIsFavorite] = useState(false);

//   const handleClick = () => {
//     setIsFavorite(!isFavorite);
//   };

//   return (
//     <button onClick={handleClick}>
//       {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
//     </button>
//   );
// }

import { useEffect, useState } from 'react';

export default function FavoriteButton({ locationId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleClick = () => {
    const newFavorites = isFavorite
      ? favorites.filter((id) => id !== locationId)
      : [...favorites, locationId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button onClick={handleClick}>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
}
