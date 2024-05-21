import { combineReducers } from 'redux';

const stockReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_STOCKS':
        return action.payload.results;
      default:
        return state;
    }
  };

  const gainerReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GAINERS':
        return action.payload.tickers;
      default:
        return state;
    }
  };

  const loserReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LOSERS':
        return action.payload.tickers;
      default:
        return state;
    }
  };
  
  // stock will be on the redux state at:
  // state.stocks
  export default combineReducers({
    stockReducer,
    gainerReducer,
    loserReducer
});