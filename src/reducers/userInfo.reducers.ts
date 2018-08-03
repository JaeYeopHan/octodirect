import {
  UserInfo,
  setUserInfoToLocalStorage,
  getUserInfoToLocalStorage,
} from '../service/userInfo.service';
import { Actions, ActionTypes } from '../actions/actions';
import { Reducer } from 'redux';

export interface UserInfoState {
  info: UserInfo;
}

const userInfo = getUserInfoToLocalStorage();
const initialState: UserInfoState = userInfo
  ? {
      info: userInfo,
    }
  : {
      info: {
        name: '',
        token: '',
      },
    };

export const userInfoReducers: Reducer<Readonly<UserInfoState>> = (
  state: UserInfoState = initialState,
  action: Actions,
) => {
  switch (action.type) {
    case ActionTypes.INSERT_USERINFO:
      const info = action.payload;

      setUserInfoToLocalStorage(info);

      return {
        ...state,
        ...{
          info,
        },
      };

    default:
      return state;
  }
};
