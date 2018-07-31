import React from 'react';
import { ItemsLayout } from '../../../styled-components/ItemsLayout';

const NeedAuthElement = ItemsLayout.extend`
  height: 210px;
  font-size: 16px;
  text-align: center;
`;

export const NeedAuth: React.SFC = () => (
  <NeedAuthElement>
    <div> Please, setting </div>
  </NeedAuthElement>
);
