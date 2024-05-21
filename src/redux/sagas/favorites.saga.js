import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_STOCKS" actions
function* fetchFavorites(action) {
  try {

    const response = yield axios.get(`/api/user/favorites/${action.payload}`);


    yield put({ type: 'SET_FAVORITES', payload: response.data });
  } catch (error) {
    console.log('Favorites get request failed', error);
  }
}
function* favoritesSaga() {
    yield takeLatest('FETCH_FAVORITES', fetchFavorites);
}

export default favoritesSaga;