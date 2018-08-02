import { all, put } from 'redux-saga/effects';
import {
  fetchGitHubRepository,
  RepositoryInfo,
} from './../service/githubRepository.service';
import { actions } from './../actions/actions';
import { getVisitedGitHubUrls } from '../service/browserHistory.service';

export const enum FetchResponseType {
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
    const [githubReposPromise, visitedItemsPromise] = yield all([
      fetchGitHubRepository,
      getVisitedGitHubUrls,
    ]);

    const githubRepos = yield githubReposPromise();
    const visitedItems = yield visitedItemsPromise();
    const repos = githubRepos.concat(visitedItems);

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
