const localStorageKey = '#__octodirect_extension_key__#';

export class LocalStorage {
  public static getData<T>(): T | void {
    const rawData = window.localStorage.getItem(localStorageKey);
    if (!rawData) {
      return;
    } else {
      return JSON.parse(rawData as string);
    }
  }

  public static setData<T>(data: T): void {
    window.localStorage.setItem(localStorageKey, JSON.stringify(data));
  }
}
