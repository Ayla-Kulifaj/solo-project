import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function FavoritesPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const favorites = useSelector(store => store.favorites);
    
  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITES', payload: user.id });
  }, []);

  const handleDeleteClick= () =>{

  }

  return (
    <div className="container">
      <p>Favorite's Page</p>
    <table>
    <tr>
      <th>Ticker Name</th>
      <th>Notes</th>
      <th>Delete</th>
    </tr>
      {favorites.map((favorite) => (
        <tr key={favorite.id}>
      <td>{favorite.stockId}</td>
      <td>{favorites.notes}</td>
      <td> < button onClick={handleDeleteClick}>Delete</button></td>
    </tr>))}
  </table>
  </div>
  );
}

export default FavoritesPage;