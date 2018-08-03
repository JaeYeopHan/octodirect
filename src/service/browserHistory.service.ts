import { bookmarks as repoMock } from './mock.service';
import { RepositoryInfo } from './githubRepository.service';
import { HistoryItem } from './browserHistory.service';

export interface HistoryItem {
  id: string;
  url?: string;
  title?: string;
  lastVisitTime?: number;
  typedCount?: number;
  visitCount?: number;
}

const filteredUrl = 'https://github.com/';
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

  return items
    .filter(
      (item: HistoryItem) =>
        item.title && item.url && item.url.includes(filteredUrl),
    )
    .map(
      (item: HistoryItem): RepositoryInfo => ({
        id: item.id,
        name: item.title as string,
        url: item.url as string,
      }),
    );
};
