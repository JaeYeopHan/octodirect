import { all } from 'redux-saga/effects';
import { fetchData, watchFetchRequest } from './repos.saga';

export default function* rootSaga() {
  yield all([fetchData(), watchFetchRequest()]);
}
