import * as React from 'react';
import { Items } from 'src/components/itemlist/ItemList';

const NotFoundElement = Items.extend`
  height: 210px;
  font-size: 16px;
  text-align: center;
`;

const NotFound = ({ value }: { value: string }) => (
  <NotFoundElement>
    <div>We couldn’t find any repositories matching: </div>
    <div>'{value}'</div>
  </NotFoundElement>
);

export default NotFound;
