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
function* deleteFavorite(action){
  try {
    axios.delete(`/api/user/favorites/${action.payload.userId}/${action.payload.favoriteId}`)
  }catch (error) {
    console.log('Delete Error:', error)
  }
}
function* postFavorite(action){
  try {
    axios.post(`/api/user/favorite`, action.payload)
  }catch (error) {
    console.log('Delete Error:', error)
  }
}

function* favoritesSaga() {
    yield takeLatest('FETCH_FAVORITES', fetchFavorites);
    yield takeLatest ('DELETE_FAVORITES', deleteFavorite)
    yield takeLatest ('POST_FAVORITE', postFavorite)
}

export default favoritesSaga;