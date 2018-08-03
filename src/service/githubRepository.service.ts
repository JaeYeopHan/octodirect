import { repos as repoMock } from './mock.service';
import { getUserInfoToLocalStorage, UserInfo } from './userInfo.service';

export interface RepositoryInfo {
  id: string;
  name: string;
  url: string;
}

export const fetchGitHubRepository = async (): Promise<RepositoryInfo[]> => {
  if (process.env.NODE_ENV === 'development') {
    return repoMock;
  }
  const info = getUserInfoToLocalStorage();
  const name = (info as UserInfo).name;
  const token = (info as UserInfo).token;

  const query = `query {
    user(login: ${name}) {
      repositories(last: 100) {
        edges {
          node {
            id
            name
            url
          }
        }
      }
    }
  }`;
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });
  const json = await response.json();

  return json.data.user.repositories.edges.map(
    ({ node }: { node: RepositoryInfo }) => node,
  );
};
