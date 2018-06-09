import { put } from 'redux-saga/effects';
import { fetchRepos } from '../service/repo.service';
import { FETCH_SUCCESS, FETCH_FAIL } from '../actions/repoAction';

export function* fetch(action?: any): any {
  try {
    const repos = yield fetchRepos();

    yield put({ type: FETCH_SUCCESS, repos });
  } catch (error) {
    yield put({ type: FETCH_FAIL, error });
  }
}
