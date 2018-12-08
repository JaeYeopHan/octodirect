import { FetchDataResponse } from './../../../src/saga/repos.saga';
import { actions } from './../../../src/actions/actions';
import {
  RepoState,
  reposReducers,
} from './../../../src/reducers/repos.reducers';
import { FetchResponseType } from './../../../src/saga/repos.saga';

describe('/reducers/repos.reducers', () => {
  function getInitialState(): RepoState {
    return {
      list: [],
      filtered: [],
      index: 0,
      value: '',
      maxIndex: 0,
      fetchResponseType: FetchResponseType.FETCH_READY,
    };
  }
  it('fetchSuccess()', () => {
    // Given
    const state = getInitialState();
    const payload: FetchDataResponse = {
      response: FetchResponseType.SUCCESS,
      data: [],
    };
    const fetchSuccess = actions.fetchSuccess(payload);

    // When
    const result = reposReducers(state, fetchSuccess);

    // Then
    const expected = {
      ...state,
      ...{
        fetchResponseType: payload.response,
      },
    };
    expect(result).toEqual(expected);
  });
});
