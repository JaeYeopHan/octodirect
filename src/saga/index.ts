import { all } from 'redux-saga/effects';
import { fetch } from './repo.saga';

export default function* rootSaga() {
  yield all([fetch()]);
}
