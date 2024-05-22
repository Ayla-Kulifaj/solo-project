import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_STOCKS" actions
function* fetchStocks() {
  try {

    const response = yield axios.get('/api/stock-data/');


    yield put({ type: 'SET_STOCKS', payload: response.data });
  } catch (error) {
    console.log('Stock get request failed', error);
  }
}

function* fetchGainers() {
    try {
  
      const response = yield axios.get('/api/stock-data/gainers');
  
  
      yield put({ type: 'SET_GAINERS', payload: response.data });
    } catch (error) {
      console.log('Stock get gainers request failed', error);
    }
  }

function* fetchLosers() {
try {

    const response = yield axios.get('/api/stock-data/losers');


    yield put({ type: 'SET_LOSERS', payload: response.data });
} catch (error) {
    console.log('Stock get losers request failed', error);
}


}

function* stockSaga() {
  yield takeLatest('FETCH_STOCKS', fetchStocks);
  yield takeLatest('FETCH_GAINERS', fetchGainers)
  yield takeLatest('FETCH_LOSERS', fetchLosers)
}

export default stockSaga;