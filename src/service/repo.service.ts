import { repos } from '../main/test';

// const BASE_URL = `https://api.github.com/users`;
// const NAME = `JaeYeopHan`;

export async function fetchRepos() {
  // const response = await fetch(`${BASE_URL}/${NAME}/repos`);
  // const repos = await response.json();

  return repos;
}
