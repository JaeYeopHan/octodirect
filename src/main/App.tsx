import * as React from 'react';
import Input from '../components/input/Input';
import ItemList from '../components/itemlist/ItemList';
import Info from '../components/info/Info';
import { Content } from '../styled-components/Content';
import { Container } from '../styled-components/Container';
import { Dispatch } from 'redux';
import { fetchReposRequest } from '../actions/repo.action';

interface AppProps {
  dispatch: Dispatch;
}

interface AppState {
  placeholder: string;
  value: string;
}

const initialState = {
  placeholder: `Find a repository`,
  value: '',
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    this.props.dispatch(fetchReposRequest());
  }

  render() {
    return (
      <Container>
        <Input />
        <Content>
          <ItemList />
        </Content>
        <Info />
      </Container>
    );
  }
}

export default App;
