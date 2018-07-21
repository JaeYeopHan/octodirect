import { all } from 'redux-saga/effects';
import { fetch } from './repos.saga';

export default function* rootSaga() {
  yield all([fetch()]);
}
