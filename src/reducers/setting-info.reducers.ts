import {
  UserInfoInterface,
  setUserInfoToLocalStorage,
  getUserInfoToLocalStorage,
} from '../service/user-info.service'
import { Actions, ActionTypes } from '../actions/actions'
import { Reducer } from 'redux'
import {
  getDomainOptionToLocalStorage,
  DomainInfoInterface,
  setDomainOptionToLocalStorage,
  deleteDomainOptionToLocalStorage,
} from '../service/setting.service'
import { DEFAULT_FILTERING_URL } from '../main/appConfig'

export interface SettingInfoState {
  userInfo: UserInfoInterface
  domainInfo: DomainInfoInterface
}

const userInfoFromStorage = getUserInfoToLocalStorage()
const domainInfoFromStorage = getDomainOptionToLocalStorage()

const initialState: SettingInfoState = {
  userInfo: userInfoFromStorage || { name: '', token: '' },
  domainInfo: domainInfoFromStorage || [DEFAULT_FILTERING_URL],
}

export const settingInfoReducers: Reducer<Readonly<SettingInfoState>> = (
  state: SettingInfoState = initialState,
  action: Actions,
) => {
  switch (action.type) {
    case ActionTypes.INSERT_USERINFO:
      const userInfo = action.payload

      setUserInfoToLocalStorage(userInfo)

      return {
        ...state,
        ...{
          userInfo,
        },
      }

    case ActionTypes.INSERT_DOMAININFO:
      const newDomainInfo = state.domainInfo.concat(action.payload)

      setDomainOptionToLocalStorage(newDomainInfo)

      return {
        ...state,
        domainInfo: newDomainInfo,
      }

    case ActionTypes.DELETE_DOMAININFO:
      const updatedDomainInfo = deleteDomainOptionToLocalStorage(action.payload)

      if (!updatedDomainInfo) {
        return state
      }
      return {
        ...state,
        domainInfo: updatedDomainInfo,
      }
    default:
      return state
  }
}
