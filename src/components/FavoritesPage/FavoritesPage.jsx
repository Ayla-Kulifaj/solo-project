import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function FavoritesPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const stocks = useSelector(store => store.favorites);
    
  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITES', payload: user.id });
  }, []);

  return (
    <div className="container">
      <p>Favorites Page</p>
    </div>
  );
}

export default FavoritesPage;