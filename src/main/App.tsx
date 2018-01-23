import * as React from 'react';
import styled from 'styled-components';
import Item from '../components/item/Item';
import { ItemType } from '../model/item.model';

const Container = styled.div`
  width: 240px;
  height: 160px;
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

interface AppProps {}

interface AppState {
  items: ItemType[];
  index: number;
}

class App extends React.Component<AppProps, AppState> {
  BASE_URL = `https://api.github.com/users`;
  NAME = `JaeYeopHan`;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      index: 0,
      items: [{id: 1, name: '', html_url: '', isActive: false}]
    };
  }

  async componentDidMount() {
    const response = await fetch(`${this.BASE_URL}/${this.NAME}/repos`);
    const repos = await response.json();
    const items = repos.map(({id, name, html_url}: ItemType, idx: number) => {
      const item = {id, name, html_url};
      return idx === this.state.index ? {isActive: true, ...item} : {isActive: false, ...item};
    });

    await this.setStateAsync({items, index: this.state.index});
  }
  
  setStateAsync(state: AppState) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  render() {
    const { items } = this.state || {items: [{id: 1, name: '', html_url: '', isActive: false}]};

    return (
      <Container>
        <Input
          placeholder={`Your Repository Name`}
          autoFocus={true}
        />
        <Items>
          {items.map((item: ItemType) => (<Item item={item} />))}
        </Items>
      </Container>
    );
  }
}

export default App;
