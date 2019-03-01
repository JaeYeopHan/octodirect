export class LocalStorage {
  public static getData<T>(localStorageKey: string): T | undefined {
    const rawData = window.localStorage.getItem(localStorageKey)

    if (!rawData) {
      return undefined
    } else {
      return JSON.parse(rawData)
    }
  }

  public static setData<T>(localStorageKey: string, data: T): void {
    window.localStorage.setItem(localStorageKey, JSON.stringify(data))
  }
}
