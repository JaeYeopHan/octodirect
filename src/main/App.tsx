import * as React from 'react';
import Input from '../components/input/Input';
import ItemList from '../components/itemlist/ItemList';
import Info from '../components/info/Info';
import { Container } from '../styled-components/Container';

export default () => (
  <Container>
    <Input />
    <ItemList />
    <Info />
  </Container>
);
