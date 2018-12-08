import { UserInfoInterface } from '../service/user-info.service';
import { createAction } from './createAction';
import { FetchDataResponse } from '../saga/repos.saga';
import { ActionsUnion } from './action-type-helper';

export enum ActionTypes {
  FETCH_REQUEST = 'FETCH_REQUEST',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAIL = 'FETCH_FAIL',

  INCREMENT_INDEX = 'INCREMENT_INDEX',
  DECREMENT_INDEX = 'DECREMENT_INDEX',

  UPDATE_VALUE = 'UPDATE_VALUE',
  TOGGLE_VIEW = 'TOGGLE_VIEW',

  INSERT_USERINFO = 'INSERT_USERINFO',

  INSERT_DOMAININFO = 'INSERT_DOMAININFO',
  DELETE_DOMAININFO = 'DELETE_DOMAININFO',
}

export const actions = {
  incrementIndex: () => createAction(ActionTypes.INCREMENT_INDEX),
  decrementIndex: () => createAction(ActionTypes.DECREMENT_INDEX),

  updateValue: (value: string) => createAction(ActionTypes.UPDATE_VALUE, value),

  fetchRequest: () => createAction(ActionTypes.FETCH_REQUEST),
  fetchSuccess: (response: FetchDataResponse) =>
    createAction(ActionTypes.FETCH_SUCCESS, response),
  fetchFail: (response: FetchDataResponse) =>
    createAction(ActionTypes.FETCH_FAIL, response),

  toggleView: () => createAction(ActionTypes.TOGGLE_VIEW),

  insertUserInfo: (info: UserInfoInterface) =>
    createAction(ActionTypes.INSERT_USERINFO, info),

  insertDomainInfo: (info: string) =>
    createAction(ActionTypes.INSERT_DOMAININFO, info),
  deleteDomainInfo: (info: string) =>
    createAction(ActionTypes.DELETE_DOMAININFO, info),
};

export type Actions = ActionsUnion<typeof actions>;
