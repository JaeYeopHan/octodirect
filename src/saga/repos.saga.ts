import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchGitHubRepository,
  RepositoryInfo,
} from '../service/github-repository.service';
import { actions, ActionTypes } from '../actions/actions';
import { getVisitedUrls } from '../service/browser-history.service';

export enum FetchResponseType {
  FETCH_READY = 'FETCH_READY',
  SUCCESS = 'SUCCESS',
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface FetchDataResponse {
  response: FetchResponseType;
  data: RepositoryInfo[];
  message?: string;
}

export function* fetchData(action?: any): any {
  try {
    const [githubRepos, visitedItems] = yield all([
      call(fetchGitHubRepository),
      call(getVisitedUrls),
    ]);
    const repos = visitedItems.concat(githubRepos);

    if (githubRepos.length === 0) {
      yield put(
        actions.fetchSuccess({
          response: FetchResponseType.NOT_AUTHORIZED,
          data: repos,
        }),
      );
    } else {
      yield put(
        actions.fetchSuccess({
          response: FetchResponseType.SUCCESS,
          data: repos,
        }),
      );
    }
  } catch (error) {
    yield put(
      actions.fetchFail({
        response: FetchResponseType.UNKNOWN_ERROR,
        data: [],
      }),
    );
  }
}

export function* watchFetchRequest() {
  yield takeEvery(ActionTypes.FETCH_REQUEST, fetchData);
}
