import { UserInfo } from './../service/userInfo.service';
import { Actions, ActionTypes } from './../actions/actions';
import { Reducer } from 'redux';

export interface UserInfoState {
  info: UserInfo;
}

const initialState: UserInfoState = {
  info: {},
};

export const UserInfoReducers: Reducer<Readonly<UserInfoState>> = (
  state: UserInfoState = initialState,
  action: Actions,
) => {
  switch (action.type) {
    case ActionTypes.INSERT_USERINFO:
      const info = action.payload;
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
