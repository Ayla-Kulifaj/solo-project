import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function FavoritesPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();


  const favorites = useSelector(store => store.favorites);
  const history=useHistory();   
  
  const [editId, setEditId] = useState(null);
  const [editNotes, setEditNotes] = useState("");

    
  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITES', payload: user.id });
  }, []);

  const deleteFavorite = (userId, favoriteId) => {
    dispatch({ type: 'DELETE_FAVORITES', payload: { userId, favoriteId }});
  }
  const handleEdit = (favorite) => {
    setEditId(favorite.id);
    setEditNotes(favorite.notes || "");
};
const handleSave = (userId, favoriteId) => {
  dispatch({
      type: 'UPDATE_FAVORITE',
      payload: { userId, favoriteId, notes: editNotes }
  });
  setEditId(null);
  history.push("/favorites")
  
};

  return (
    <div className="container">
      <p>Favorite's Page</p>
    <table>
    <thead>
    <tr>
      
      <th>Ticker Name</th>
      <th>Notes</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
    </thead>
    <tbody>
      {favorites.map((favorite) => (
        <tr key={favorite.id}>
      <td>{favorite.stockId}</td>
      <td>
      {editId === favorite.id ? (
      <input
        type="text"
        value={editNotes}
        onChange={(event) => setEditNotes(event.target.value)}
        onBlur={() => handleSave(favorite.userId, favorite.id)}
      />
     ) : (favorite.notes)}
     </td>                             
        <td>
       {editId === favorite.id ? (
       <button onClick={() => handleSave(favorite.userId, favorite.id)}>Save</button>
       ) : (
       <button onClick={() => handleEdit(favorite)}>Edit</button>)}
       </td>
       <td>
        <button onClick={() => deleteFavorite(favorite.userId,favorite.id)}>Delete</button>
       </td>
    </tr>))}
    </tbody>
  </table>
  </div>
  );
}
export default FavoritesPage;