import { LocalStorage } from '../storage/LocalStorage';

const localStorageKey = '#__octodirect_extension_bookmark_key__#';

export interface UserInfoInterface {
  name?: string;
  token?: string;
}

export function setUserInfoToLocalStorage(info: UserInfoInterface) {
  return LocalStorage.setData<UserInfoInterface>(localStorageKey, info);
}

export function getUserInfoToLocalStorage(): UserInfoInterface | undefined {
  const userInfo = LocalStorage.getData<UserInfoInterface>(localStorageKey);

  if (userInfo) {
    return userInfo;
  }
  return;
}
