import { fetchGitHubRepository } from './../service/githubRepository.service';
import { actions } from './../actions/actions';
import { put, call } from 'redux-saga/effects';

export function* fetch(action?: any): any {
  try {
    const repos = yield call(fetchGitHubRepository);

    yield put(actions.fetchSuccess(repos));
  } catch (error) {
    yield put(actions.fetchFail(error));
  }
}
