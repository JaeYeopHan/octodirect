import * as React from 'react';
import styled from 'styled-components';
import Item from '../components/item/Item';
import Input from '../components/input/Input';
import { ItemType } from '../model/item.model';

const Container = styled.div`
  width: 240px;
  height: 160px;
`;

const Items = styled.ul`
  position: relative;
  top: 40px;
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
  maxIndex: number;
  value: string;
}

class App extends React.Component<AppProps, AppState> {
  BASE_URL = `https://api.github.com/users`;
  NAME = `JaeYeopHan`;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      index: 0,
      maxIndex: 0,
      items: [{id: 1, name: '', html_url: ''}],
      value: '',
    };
  }

  async componentDidMount() {
    const response = await fetch(`${this.BASE_URL}/${this.NAME}/repos`);
    const repos = await response.json();
    const items = repos.map(({id, name, html_url}: ItemType, idx: number) => {
      const item = {id, name, html_url};
      return idx === this.state.index ? {isActive: true, ...item} : {isActive: false, ...item};
    });

    await this.setStateAsync({items, index: this.state.index, maxIndex: repos.length, value: ''});
  }
  
  setStateAsync(state: AppState) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  upIndex(index: number) {
    const newIndex = index + 1;
    const { items } = this.state;

    this.setState({index: newIndex});
    return items[newIndex].name;
  }

  downIndex(index: number): string {
    const newIndex = index - 1;
    const { items } = this.state;

    this.setState({index: newIndex});
    return items[newIndex].name;
  }

  updateValue(text: string) {
    this.setState({value: text});
  }
  render() {
    const { items } = this.state || {items: [{id: 1, name: '', html_url: '', isActive: false}]};

    return (
      <Container>
        <Input
          index={this.state.index}
          maxIndex={this.state.maxIndex}
          upIndex={(index: number) => this.upIndex(index)}
          downIndex={(index: number) => this.downIndex(index)}
          updateValue={(text: string) => this.updateValue(text)}
        />
        <Items>
          {items.map((item: ItemType, i) => (<Item key={i} item={item} index={i} currentIndex={this.state.index} />))}
        </Items>
      </Container>
    );
  }
}

export default App;
