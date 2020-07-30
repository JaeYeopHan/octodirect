export enum CHROME_STORAGE_KEY {
  GITHUB_TOKEN = '#__octodirect_extension_github_token_key__#',
  DOMAIN_KEY_LIST = '#__octodirect_extension_domain_key__#',
}

export const saveData = <T>(key: CHROME_STORAGE_KEY, value: T) => {
    return new Promise<boolean>((resolve) => {
        chrome.storage.sync.set({ [key]: value }, () => resolve(true))
    })
}

export const getData = <T>(key: CHROME_STORAGE_KEY): Promise<T> => {
    return new Promise<T>((resolve) => {
        chrome.storage.sync.get(key, (items: any) => {
          return resolve(items[key])
        })
    })
}
