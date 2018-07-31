import { UserInfo } from './../service/userInfo.service';
import { createAction } from './createAction';
import { ActionsUnion } from '../types';
import { RepositoryInfo } from '../service/githubRepository.service';

export const enum ActionTypes {
  FETCH_REQUEST = 'FETCH_REQUEST',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAIL = 'FETCH_FAIL',

  INCREMENT_INDEX = 'INCREMENT_INDEX',
  DECREMENT_INDEX = 'DECREMENT_INDEX',

  UPDATE_VALUE = 'UPDATE_VALUE',
  TOGGLE_VIEW = 'TOGGLE_VIEW',

  INSERT_USERINFO = 'INSERT_USERINFO',
}

export const actions = {
  incrementIndex: () => createAction(ActionTypes.INCREMENT_INDEX),
  decrementIndex: () => createAction(ActionTypes.DECREMENT_INDEX),

  updateValue: (value: string) => createAction(ActionTypes.UPDATE_VALUE, value),

  fetchRequest: () => createAction(ActionTypes.FETCH_REQUEST),
  fetchSuccess: (repos: RepositoryInfo[]) =>
    createAction(ActionTypes.FETCH_SUCCESS, repos),
  fetchFail: (error: string) => createAction(ActionTypes.FETCH_FAIL, error),
  toggleView: () => createAction(ActionTypes.TOGGLE_VIEW),
  insertUserInfo: (info: UserInfo) =>
    createAction(ActionTypes.INSERT_USERINFO, info),
};

export type Actions = ActionsUnion<typeof actions>;
