import * as React from 'react';
import { ItemsLayout } from '../../styled-components/ItemsLayout';

const NotFoundElement = ItemsLayout.extend`
  height: 210px;
  font-size: 16px;
  text-align: center;
`;

export const NotFound = ({ value }: { value: string }) => (
  <NotFoundElement>
    <div>We couldn’t find any repositories matching: </div>
    <div>'{value}'</div>
  </NotFoundElement>
);
