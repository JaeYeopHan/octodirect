import * as React from 'react';
import Input from '../components/input/Input';
import { ItemType } from '../model/item.model';
// import NotFound from '../components/not-found/NotFound';
import ItemList from '../components/itemlist/ItemList';
import Info from '../components/info/Info';
import { Content } from '../styled-components/Content';
import { Container } from '../styled-components/Container';
import { Dispatch } from 'redux';
import { fetchReposRequest } from '../actions/repoAction';

interface AppProps {
  dispatch: Dispatch;
}

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
  items: [{ id: 1, name: '', htmlUrl: '' }],
  value: '',
  filtered: [],
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    this.props.dispatch(fetchReposRequest());
  }

  updateState(newIndex: number) {
    const value = this.state.filtered[newIndex].name;

    this.setState({ index: newIndex });
    this.setState({ placeholder: value });
  }

  updateValue(value: string) {
    const { items } = this.state;
    const filtered = items.filter(({ name }: { name: string }) =>
      name.includes(value),
    );

    this.setState({ value, filtered, index: 0, maxIndex: filtered.length - 1 });
  }

  redirect() {
    const { index, items } = this.state;
    console.log(index);
    console.log(items[index].htmlUrl);

    location.href = items[index].htmlUrl;
  }

  render() {
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
          {/* {value === '' || filtered.length === 0 ? (
            <NotFound value={value} />
          ) : ( */}
          <ItemList />
          {/* )} */}
        </Content>
        <Info />
      </Container>
    );
  }
}

export default App;
