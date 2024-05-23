import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



function AccountPage() {
  const user = useSelector((store) => store.user);
  const favorites = useSelector(store => store.favorites);
  const [newUsername, setNewUsername] = useState('');
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('handle submit : ', newUsername)
      dispatch({ type: 'UPDATE_USERNAME', payload: {
        username: newUsername, 
        userId: user.id}});
      setNewUsername('');
      history.push ("/accounts")
  };

  return (
    <div>
      <h2>Account Page</h2>
      <p>Here are your account details:</p>
      <p>Current Username: {user.username}</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={newUsername}
          onChange={handleUsernameChange}
          placeholder="Change Username"
        />
        <button type="submit">Sumbit</button>
      </form>
      <p>User ID Number: {user.id}</p>
      <p>Favorite Stocks: {favorites.map(favorite => <li key={favorite.id}>{favorite.stockId}</li>)}</p>
    </div>
  );
}

export default AccountPage;