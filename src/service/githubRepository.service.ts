import { getUserInfoToLocalStorage, UserInfo } from './userInfo.service';

export const fetchGitHubRepository = async () => {
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
  console.log(json.data.user.repositories.edges);

  return json.data.user.repositories.edges;
};
