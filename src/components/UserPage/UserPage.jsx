import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import './UserPage.css'; 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function UserPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const stocks = useSelector(store => store.stocks.stockReducer.results);
  const gainers = useSelector(store => store.stocks.gainerReducer);
  const losers = useSelector(store => store.stocks.loserReducer);
  const history=useHistory();

  const addToFavorites = (userId,stockId) => {
    dispatch({type: 'POST_FAVORITE', payload:{
      userId:userId,
      stockId: stockId}});
      history.push("/Favorites");
  }
  useEffect(() => {
    dispatch({ type: 'FETCH_STOCKS' });
    dispatch({ type: 'FETCH_GAINERS' });
    dispatch({ type: 'FETCH_LOSERS' });
  }, [dispatch]);



  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />

      <div className="tables-container">
        <div className="table-wrapper">
          <h3>Top Gains</h3>
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Today's Change (%)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {gainers.length > 0 ? (
                gainers.map((stock) => (
                  <tr key={stock.id}>
                    <td>{stock.ticker}</td>
                    <td className="gainer">{stock.todaysChangePerc.toFixed(2)}%</td> 
                    <td><button onClick={() => addToFavorites(user.id, stock.ticker)}>Add To Favorites</button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-wrapper">
          <h3>Top Losers</h3>
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Today's Change (%)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {losers.length > 0 ? (
                losers.map((stock) => (
                  <tr>
                    <td>{stock.ticker}</td>
                    <td className="loser">{stock.todaysChangePerc.toFixed(2)}%</td>
                    <td>< button onClick={() => addToFavorites(user.id, stock.ticker)}>Add To Favorites</button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;