import * as React from 'react';
import styled from 'styled-components';
import Item from '../components/item/Item';
import Input from '../components/input/Input';
import { ItemType } from '../model/item.model';

const Container = styled.div`
  width: 280px;
  height: 160px;
`;

const Items = styled.ul`
  position: relative;
  top: 40px;
  margin: auto 4px;
  padding: 12px;
  width: calc(100% - 36px);
  height: 100%;
  font-size: 14px;
  font-weight: bold;
  color: #24292E;
  background-color: #FAFBFC;
  border: solid 1px #E2E4E8;
  border-radius: 3px;
  overflow-y: scroll;
`;

const NotFound = Items.extend`
  font-size: 16px;
  text-align: center;
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
  items: [{id: 1, name: '', html_url: ''}],
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
    const items = repos.map(({id, name, html_url}: ItemType) => ({id, name, html_url}));
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
    console.log(items[index].html_url);

    location.href = items[index].html_url;
  }

  render() {
    const { filtered, value } = this.state;

    const notFoundElm = (
      <NotFound>
        <div>We couldn’t find any repositories matching: </div>
        <div>'{value}'</div>
      </NotFound>
    );
    const itemList = (
      <Items>
        {filtered.map((item: ItemType, i) => (
          <Item
            key={i}
            item={item}
            index={i}
            currentIndex={this.state.index}
          />))}
      </Items>
    );

    return (
      <Container>
        <Input
          placeholder={this.state.placeholder}
          index={this.state.index}
          maxIndex={this.state.maxIndex}
          upIndex={(index: number) => this.updateState(index + 1)}
          downIndex={(index: number) => this.updateState(index - 1)}
          updateValue={(text: string) => this.updateValue(text)}
          redirect={() => this.redirect()}
        />
        {value === '' ? notFoundElm : itemList}
      </Container>
    );
  }
}

export default App;
