import { fetchGitHubRepository } from './../service/githubRepository.service';
import { actions } from './../actions/actions';
import { all, put } from 'redux-saga/effects';
import { getVisitedGitHubUrls } from '../service/browserHistory.service';

export function* fetchData(action?: any): any {
  try {
    const [githubReposPromise, visitedItemsPromise] = yield all([
      fetchGitHubRepository,
      getVisitedGitHubUrls,
    ]);

    const githubRepos = yield githubReposPromise();
    const visitedItems = yield visitedItemsPromise();
    const repos = githubRepos.concat(visitedItems);

    yield put(actions.fetchSuccess(repos));
  } catch (error) {
    yield put(actions.fetchFail(error));
  }
}
