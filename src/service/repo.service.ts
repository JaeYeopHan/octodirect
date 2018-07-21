import { repos as repoMock } from './mock';

export async function fetchRepos() {
  if (process.env.NODE_ENV === 'development') {
    return repoMock;
  }
  const BASE_URL = `https://api.github.com/users`;
  const NAME = `JaeYeopHan`;
  const response = await fetch(`${BASE_URL}/${NAME}/repos`);
  const repos = await response.json();

  return repos;
}
