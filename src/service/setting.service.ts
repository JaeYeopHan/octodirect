import { LocalStorage } from '../storage/LocalStorage';

const localStorageKey = '#__octodirect_extension_domain_key__#';

export type DomainInfo = string[];

export function setDomainOptionToLocalStorage(info: DomainInfo) {
  return LocalStorage.setData<DomainInfo>(localStorageKey, info);
}

export function getDomainOptionToLocalStorage(): DomainInfo | undefined {
  const domainInfo = LocalStorage.getData<DomainInfo>(localStorageKey);

  if (domainInfo) {
    return domainInfo;
  }
  return;
}
