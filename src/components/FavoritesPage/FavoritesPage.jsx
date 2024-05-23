import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function FavoritesPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const favorites = useSelector(store => store.favorites);
  const history=useHistory();
    
  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITES', payload: user.id });
  }, []);

  const deleteFavorite= (userId, favoriteId) =>{
      dispatch({ type: 'DELETE_FAVORITES', payload: {userId: userId, favoriteId: favoriteId }})
      history.push ("/favorites");
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
      <td>{favorite.notes}</td>
      <td> < button onClick={() => deleteFavorite(favorite.userId,favorite.id)}>Delete</button></td>
    </tr>))}
  </table>
  </div>
  );
}
export default FavoritesPage;