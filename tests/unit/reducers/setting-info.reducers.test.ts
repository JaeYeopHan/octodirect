import {
  SettingInfoState,
  settingInfoReducers,
} from '../../../src/reducers/setting-info.reducers';
import { actions } from '../../../src/actions/actions';
import { DomainInfoInterface } from 'src/service/setting.service';
import { UserInfoInterface } from 'src/service/user-info.service';

describe('/reducers/setting-info.reducers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  function getInitialState(
    userInfo: UserInfoInterface = { name: 'test', token: '' },
    domainInfo: DomainInfoInterface = ['testurl'],
  ): SettingInfoState {
    return {
      userInfo,
      domainInfo,
    };
  }

  it('insertUserInfo()', () => {
    // Given
    const state = getInitialState();
    const userInfo = {
      name: 'Jbee',
      token: 'jbee-token',
    };
    const insertUserInfo = actions.insertUserInfo(userInfo);

    // When
    const result = settingInfoReducers(state, insertUserInfo);

    // Then
    const expected = {
      ...state,
      ...{
        userInfo,
      },
    };
    expect(result).toEqual(expected);
  });

  it('insertDomainInfo()', () => {
    // Given
    const state = getInitialState();
    const newDomainInfo = 'testUrl';
    const insertDomainInfo = actions.insertDomainInfo(newDomainInfo);
    const domainInfo = state.domainInfo.concat(newDomainInfo);

    // When
    const result = settingInfoReducers(state, insertDomainInfo);

    // Then
    const expected = {
      ...state,
      domainInfo,
    };
    expect(result).toEqual(expected);
  });
});
