import { LocalStorage } from '../storage/LocalStorage';

export interface UserInfo {
  name?: string;
  token?: string;
}

export function setUserInfoToLocalStorage(info: UserInfo) {
  return LocalStorage.setData<UserInfo>(info);
}

export function getUserInfoToLocalStorage(): UserInfo | string {
  const userInfo = LocalStorage.getData<UserInfo>();

  if (userInfo) {
    return userInfo;
  }
  return '';
}
