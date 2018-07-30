const query = `query {
  user(login: "USER_NAME") {
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

const accessToken = 'ACCESS_TOKEN';

export const fetchRepos = async () => {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query }),
  });
  const json = await response.json();
  console.log(json.data.user.repositories.edges);

  return json.data.user.repositories.edges;
};
