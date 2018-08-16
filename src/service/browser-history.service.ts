import { bookmarks as repoMock } from './mock.service';
import { RepositoryInfo } from './github-repository.service';
import { HistoryItem } from './browser-history.service';
import { getDomainOptionToLocalStorage } from './setting.service';

export interface HistoryItem {
  id: string;
  url?: string;
  title?: string;
  lastVisitTime?: number;
  typedCount?: number;
  visitCount?: number;
}

export const defaultFilteringUrls = ['https://github.com/'];
const maxResults = 200;

export const getVisitedGitHubUrls = async (): Promise<RepositoryInfo[]> => {
  if (process.env.NODE_ENV === 'development') {
    return repoMock;
  }
  const items = await new Promise<HistoryItem[]>((resolve, _) => {
    chrome.history.search(
      { text: '', maxResults },
      (historyItems: HistoryItem[]) => {
        resolve(historyItems);
      },
    );
  });

  return items.filter(isFilterItem).map(
    (item: HistoryItem): RepositoryInfo => ({
      id: item.id,
      name: item.title as string,
      url: item.url as string,
    }),
  );
};

export function getFilteringUrls() {
  const domainInfo = getDomainOptionToLocalStorage();

  if (domainInfo && domainInfo.length > 0) {
    return domainInfo.concat(defaultFilteringUrls);
  } else {
    return defaultFilteringUrls;
  }
}

function isFilterItem(item: HistoryItem) {
  const filteringUrls = getFilteringUrls();

  if (item.title && item.url) {
    for (const url of filteringUrls) {
      return item.url.includes(url);
    }
  }

  return false;
}
