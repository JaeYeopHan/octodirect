import { bookmarks as repoMock } from './mock.service';
import { RepositoryInfo } from './githubRepository.service';
import { HistoryItem } from './browserHistory.service';
import { getDomainOptionToLocalStorage } from './setting.service';

export interface HistoryItem {
  id: string;
  url?: string;
  title?: string;
  lastVisitTime?: number;
  typedCount?: number;
  visitCount?: number;
}

const defaultFilteringUrl = 'https://github.com/';
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

function isFilterItem(item: HistoryItem) {
  const domainInfo = getDomainOptionToLocalStorage();

  let filteringUrls: string[];

  if (domainInfo && domainInfo.length > 0) {
    filteringUrls = domainInfo.concat([defaultFilteringUrl]);
  } else {
    filteringUrls = [defaultFilteringUrl];
  }

  if (item.title && item.url) {
    for (const url of filteringUrls) {
      return item.url.includes(url);
    }
  }

  return false;
}
