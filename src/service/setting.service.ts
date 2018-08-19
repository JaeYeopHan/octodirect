import { LocalStorage } from '../storage/LocalStorage';
import { deleteItem } from '../utils/Array';

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

export function deleteDomainOptionToLocalStorage(
  target: string,
): DomainInfoInterface | undefined {
  const domains = getDomainOptionToLocalStorage();

  if (!domains) {
    return domains;
  }

  const updatedDomains = deleteItem<string>(domains, target);

  setDomainOptionToLocalStorage(updatedDomains);

  return updatedDomains;
}
