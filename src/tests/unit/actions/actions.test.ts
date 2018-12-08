import { ActionTypes, actions } from '../../../actions/actions';
import { FetchResponseType, FetchDataResponse } from '../../../saga/repos.saga';
import { UserInfoInterface } from '../../../service/user-info.service';

describe('/actions/actions', () => {
  it('INCREMENT_INDEX, DECREMENT_INDEX', () => {
    // Given
    const incrementIndex = {
      type: ActionTypes.INCREMENT_INDEX,
    };
    const decrementIndex = {
      type: ActionTypes.DECREMENT_INDEX,
    };

    // When

    // Then
    expect(actions.incrementIndex()).toEqual(incrementIndex);
    expect(actions.decrementIndex()).toEqual(decrementIndex);
  });

  it('UPDATE_VALUE', () => {
    // Given
    const mockPayload = 'mock';
    const updateValue = {
      type: ActionTypes.UPDATE_VALUE,
      payload: mockPayload,
    };

    // When

    // Then
    expect(actions.updateValue(mockPayload)).toEqual(updateValue);
  });

  it('FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL', () => {
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
    expect(actions.fetchRequest()).toEqual(fetchRequest);
    expect(actions.fetchSuccess(mockPayload)).toEqual(fetchSuccess);
    expect(actions.fetchFail(mockPayload)).toEqual(fetchFail);
  });

  it('TOGGLE_VIEW', () => {
    // Given
    const toggleView = {
      type: ActionTypes.TOGGLE_VIEW,
    };

    // When

    // Then
    expect(toggleView).toEqual(actions.toggleView());
  });

  it('INSERT_USERINFO', () => {
    // Given
    const mockPayload: UserInfoInterface = {};
    const insertUserInfo = {
      type: ActionTypes.INSERT_USERINFO,
      payload: mockPayload,
    };

    // When

    // Then
    expect(actions.insertUserInfo(mockPayload)).toEqual(insertUserInfo);
  });

  it('INSERT_DOMAININFO, DELETE_DOMAININFO', () => {
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
    expect(actions.insertDomainInfo(mockPayload)).toEqual(insertDomainInfo);
    expect(actions.deleteDomainInfo(mockPayload)).toEqual(deleteDomainInfo);
  });
});
