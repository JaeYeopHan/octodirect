import { LocalStorage } from '../storage/LocalStorage';

const localStorageKey = '#__octodirect_extension_bookmark_key__#';

export interface UserInfo {
  name?: string;
  token?: string;
}

export function setUserInfoToLocalStorage(info: UserInfo) {
  return LocalStorage.setData<UserInfo>(localStorageKey, info);
}

export function getUserInfoToLocalStorage(): UserInfo | undefined {
  const userInfo = LocalStorage.getData<UserInfo>(localStorageKey);

  if (userInfo) {
    return userInfo;
  }
  return;
}
