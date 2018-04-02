import * as React from 'react';
import styled from 'styled-components';
import Input from '../components/input/Input';
import { ItemType } from '../model/item.model';
import NotFound from '../components/not-found/NotFound';
import ItemList from '../components/itemlist/ItemList';
import Info from '../components/info/Info';
// import { repos as data } from './test';

const Container = styled.div`
  width: 280px;
  height: 100%;
`;

const Content = styled.div`
  margin-bottom: 12px;
  height: calc(100% - 48px);
`;

interface AppProps {}

interface AppState {
  placeholder: string;
  items: ItemType[];
  filtered: ItemType[];
  index: number;
  maxIndex: number;
  value: string;
}

const initialState = {
  placeholder: `Find a repository`,
  index: 0,
  maxIndex: 0,
  items: [{id: 1, name: '', htmlUrl: ''}],
  value: '',
  filtered: [],
};

class App extends React.Component<AppProps, AppState> {
  BASE_URL = `https://api.github.com/users`;
  NAME = `JaeYeopHan`;

  constructor(props: AppProps) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    const response = await fetch(`${this.BASE_URL}/${this.NAME}/repos`);
    const repos = await response.json();
    // const repos = data;
    const items = repos.map(({id, name, htmlUrl}: ItemType) => ({id, name, htmlUrl}));
    await this.setStateAsync({...initialState, items});
  }

  setStateAsync(state: AppState) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  updateState(newIndex: number) {
    const value = this.state.filtered[newIndex].name;

    this.setState({index: newIndex});
    this.setState({placeholder: value});
  }

  updateValue(value: string) {
    const { items } = this.state;
    const filtered = items.filter(({name}: {name: string}) => name.includes(value));

    this.setState({value, filtered, index: 0, maxIndex: filtered.length - 1});
  }

  redirect() {
    const { index, items } = this.state;
    console.log(index);
    console.log(items[index].htmlUrl);

    location.href = items[index].htmlUrl;
  }

  render() {
    const { filtered, value } = this.state;

    return (
      <Container>
        <Input
          placeholder={this.state.placeholder}
          index={this.state.index}
          maxIndex={this.state.maxIndex}

          updateState={(index: number) => this.updateState(index)}
          updateValue={(text: string) => this.updateValue(text)}
          redirect={() => this.redirect()}
        />
        <Content>
        {
          value === '' || filtered.length === 0
          ? <NotFound value={value} />
          : <ItemList filtered={filtered} index={this.state.index} />
        }
        </Content>
        <Info />
      </Container>
    );
  }
}

export default App;
