import React from 'react';
import { ItemsLayout } from '../../../../styled-components/ItemsLayout';

const LoadingElement = ItemsLayout.extend`
  height: 210px;
  font-size: 16px;
  text-align: center;
`;

export const Loading: React.SFC = () => (
  <LoadingElement>
    <div> Loading... </div>
  </LoadingElement>
);
