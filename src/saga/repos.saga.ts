import { actions } from './../actions/actions';
import { put, call } from 'redux-saga/effects';
import { fetchRepos } from '../service/repo.service';

export function* fetch(action?: any): any {
  try {
    const repos = yield call(fetchRepos);

    yield put(actions.fetchSuccess(repos));
  } catch (error) {
    yield put(actions.fetchFail(error));
  }
}
