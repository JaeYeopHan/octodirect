import * as React from 'react';
import Input from '../components/input/Input';
import ItemList from '../components/itemlist/ItemList';
import Info from '../components/info/Info';
import { AppLayout } from '../styled-components/AppLayout';

export default () => (
  <AppLayout>
    <Input />
    <ItemList />
    <Info />
  </AppLayout>
);
