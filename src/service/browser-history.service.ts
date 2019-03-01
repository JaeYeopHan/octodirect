import { bookmarks as repoMock } from '../tests/mock/mock.service';
import { RepositoryInfo } from './github-repository.service';
import { HistoryItem } from './browser-history.service';
import { getDomainOptionToLocalStorage } from './setting.service';
import { MAX_COUNT_OF_HISTORY, DEFAULT_FILTERING_URL } from '../main/appConfig';

export interface HistoryItem {
  id: string;
  url?: string;
  title?: string;
  lastVisitTime?: number;
  typedCount?: number;
  visitCount?: number;
}

export const getVisitedUrls = async (): Promise<RepositoryInfo[]> => {
  if (process.env.NODE_ENV === 'development') {
    return repoMock;
  }
  const items = await new Promise<HistoryItem[]>((resolve, _) => {
    chrome.history.search(
      { text: '', maxResults: MAX_COUNT_OF_HISTORY },
      (historyItems: HistoryItem[]) => {
        resolve(historyItems);
      },
    );
  });
  const filteringUrls: string[] = getFilteringUrls();

  return items
    .filter((item: HistoryItem) => isFilterItem(item, filteringUrls))
    .map(
      (item: HistoryItem): RepositoryInfo => ({
        id: item.id,
        name: item.title as string,
        url: item.url as string,
      }),
    );
};

function getFilteringUrls(): string[] {
  const domainInfo = getDomainOptionToLocalStorage();

  if (domainInfo && domainInfo.length > 0) {
    if (domainInfo.indexOf(DEFAULT_FILTERING_URL) >= 0) {
      return domainInfo;
    }
    return domainInfo.concat(DEFAULT_FILTERING_URL);
  } else {
    return [DEFAULT_FILTERING_URL];
  }
}

function isFilterItem(item: HistoryItem, filteringUrls: string[]): boolean {
  if (item.title && item.url) {
    for (const url of filteringUrls) {
      if (item.url.includes(url)) {
        return true;
      }
    }
  }

  return false;
}
