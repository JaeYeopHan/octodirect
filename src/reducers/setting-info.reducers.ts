import {
  UserInfoInterface,
  setUserInfoToLocalStorage,
  getUserInfoToLocalStorage,
} from '../service/user-info.service';
import { Actions, ActionTypes } from '../actions/actions';
import { Reducer } from 'redux';
import {
  getDomainOptionToLocalStorage,
  DomainInfoInterface,
  setDomainOptionToLocalStorage,
} from '../service/setting.service';
import { defaultFilteringUrls } from '../service/browser-history.service';

export interface SettingInfoState {
  userInfo: UserInfoInterface;
  domainInfo: DomainInfoInterface;
}

const userInfoFromStorage = getUserInfoToLocalStorage();
const domainInfoFromStorage = getDomainOptionToLocalStorage();

const initialState: SettingInfoState = {
  userInfo: userInfoFromStorage || { name: '', token: '' },
  domainInfo: domainInfoFromStorage || defaultFilteringUrls,
};

export const settingInfoReducers: Reducer<Readonly<SettingInfoState>> = (
  state: SettingInfoState = initialState,
  action: Actions,
) => {
  switch (action.type) {
    case ActionTypes.INSERT_USERINFO:
      const userInfo = action.payload;

      setUserInfoToLocalStorage(userInfo);

      return {
        ...state,
        ...{
          userInfo,
        },
      };

    case ActionTypes.INSERT_DOMAININFO:
      const newDomainInfo = state.domainInfo.concat(action.payload);

      setDomainOptionToLocalStorage(newDomainInfo);

      return {
        ...state,
        domainInfo: newDomainInfo,
      };
      break;
    default:
      return state;
  }
};
