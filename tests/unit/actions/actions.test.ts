import { UserInfoInterface } from './../../../src/service/user-info.service';
import {
  FetchDataResponse,
  FetchResponseType,
} from './../../../src/saga/repos.saga';
import { actions, ActionTypes } from '../../../src/actions/actions';

describe('/actions/actions', () => {
  it('Test related index action', () => {
    // Given
    const incrementIndex = {
      type: ActionTypes.INCREMENT_INDEX,
    };
    const decrementIndex = {
      type: ActionTypes.DECREMENT_INDEX,
    };

    // When

    // Then
    expect(incrementIndex).toEqual(actions.incrementIndex());
    expect(decrementIndex).toEqual(actions.decrementIndex());
  });

  it('Test related value action', () => {
    // Given
    const mockPayload = 'mock';
    const updateValue = {
      type: ActionTypes.UPDATE_VALUE,
      payload: mockPayload,
    };

    // When

    // Then
    expect(updateValue).toEqual(actions.updateValue(mockPayload));
  });

  it('Test related ajax', () => {
    // Given
    const mockPayload: FetchDataResponse = {
      response: FetchResponseType.FETCH_READY,
      data: [],
    };
    const fetchRequest = {
      type: ActionTypes.FETCH_REQUEST,
    };
    const fetchSuccess = {
      type: ActionTypes.FETCH_SUCCESS,
      payload: mockPayload,
    };
    const fetchFail = {
      type: ActionTypes.FETCH_FAIL,
      payload: mockPayload,
    };

    // When

    // Then
    expect(fetchRequest).toEqual(actions.fetchRequest());
    expect(fetchSuccess).toEqual(actions.fetchSuccess(mockPayload));
    expect(fetchFail).toEqual(actions.fetchFail(mockPayload));
  });

  it('Test related view', () => {
    // Given
    const toggleView = {
      type: ActionTypes.TOGGLE_VIEW,
    };

    // When

    // Then
    expect(toggleView).toEqual(actions.toggleView());
  });

  it('Test related userInfo action', () => {
    // Given
    const mockPayload: UserInfoInterface = {};
    const insertUserInfo = {
      type: ActionTypes.INSERT_USERINFO,
      payload: mockPayload,
    };

    // When

    // Then
    expect(insertUserInfo).toEqual(actions.insertUserInfo(mockPayload));
  });

  it('Test related domainInfo action', () => {
    // Given
    const mockPayload = '';
    const insertDomainInfo = {
      type: ActionTypes.INSERT_DOMAININFO,
      payload: mockPayload,
    };
    const deleteDomainInfo = {
      type: ActionTypes.DELETE_DOMAININFO,
      payload: mockPayload,
    };

    // When

    // Then
    expect(insertDomainInfo).toEqual(actions.insertDomainInfo(mockPayload));
    expect(deleteDomainInfo).toEqual(actions.deleteDomainInfo(mockPayload));
  });
});
