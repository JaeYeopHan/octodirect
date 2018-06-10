import * as React from 'react';
import Input from '../components/input/Input';
import ItemList from '../components/itemlist/ItemList';
import Info from '../components/info/Info';
import { Container } from '../styled-components/Container';
import { Dispatch } from 'redux';

const App = ({ dispatch }: { dispatch: Dispatch }) => (
  <Container>
    <Input />
    <ItemList />
    <Info />
  </Container>
);

export default App;
