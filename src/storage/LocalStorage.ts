export class LocalStorage {
  public static getData<T>(localStorageKey: string): T | void {
    const rawData = window.localStorage.getItem(localStorageKey);
    if (!rawData) {
      return;
    } else {
      return JSON.parse(rawData as string);
    }
  }

  public static setData<T>(localStorageKey: string, data: T): void {
    window.localStorage.setItem(localStorageKey, JSON.stringify(data));
  }
}
