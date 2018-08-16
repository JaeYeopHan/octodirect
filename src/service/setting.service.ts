import { LocalStorage } from '../storage/LocalStorage';

const localStorageKey = '#__octodirect_extension_domain_key__#';

export type DomainInfoInterface = string[];

export function setDomainOptionToLocalStorage(info: DomainInfoInterface) {
  return LocalStorage.setData<DomainInfoInterface>(localStorageKey, info);
}

export function getDomainOptionToLocalStorage():
  | DomainInfoInterface
  | undefined {
  const domainInfo = LocalStorage.getData<DomainInfoInterface>(localStorageKey);

  if (domainInfo) {
    return domainInfo;
  }
  return;
}
