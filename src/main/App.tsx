import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 240px;
  height: 200px;
`;

const Input = styled.input`
  position: fixed;
  top: 2px;
  width: 100%;
  color: grey;
  font-size: 16px;
  border: none;
`;

const Items = styled.ul`
  position: relative;
  top: 28px;
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-weight: bold;
  overflow-y: scroll;
`;

const Item = styled.li`
  padding: 8px 8px;
  border-bottom: 1px solid grey;
  overflow-x: hidden;
  white-space : nowrap;
  text-overflow : ellipsis;
`;

const ActiveItem = Item.extend`
  color: #fff;
  background-color: #0366D6;
  font-weight: bolder;
  font-size: 14px;
`;

interface AppState {
  values: Array<Item>;
}

type Item = {
  id: number;
  name: string;
  html_url: string;
};

class App extends React.Component<{}, AppState> {
  BASE_URL = `https://api.github.com/users`;
  NAME = `JaeYeopHan`;

  async componentDidMount() {
    const response = await fetch(`${this.BASE_URL}/${this.NAME}/repos`);
    const repos = await response.json();
    const values = repos.map(({id, name, html_url}: Item) => ({id, name, html_url}));

    await this.setStateAsync({values});
  }
  
  setStateAsync(state: AppState) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }
  render() {
    return (
      <Container>
        <Input
          placeholder={`Your Repository Name`}
          autoFocus={true}
        />
        <Items>
          <ActiveItem>Active repo</ActiveItem>
          <Item>repository</Item>
        </Items>
      </Container>
    );
  }
}

export default App;
