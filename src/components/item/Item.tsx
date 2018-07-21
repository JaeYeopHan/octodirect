import React from 'react';
import styled from 'styled-components';
import { ItemType } from '../../model/item.model';

const DefaultItem = styled.li`
  padding: 10px 8px;
  height: 12px;
  border-bottom: 1px solid #dddddd;
  vertical-align: middle;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #24292e;
`;

const ActiveItem = DefaultItem.extend`
  background-color: #0366d6;
  font-weight: bolder;
  font-size: 14px;
`;

interface ItemProps {
  item: ItemType;
  index: number;
  curIndex: number;
}

export const Item: React.SFC<ItemProps> = ({ item, index, curIndex }) => {
  const { id, name, htmlUrl } = item;
  const defaultItem = (
    <DefaultItem key={id}>
      <a href={htmlUrl}>{name}</a>
    </DefaultItem>
  );
  const activeItem = (
    <ActiveItem key={id} aria-selected="true">
      <a href={htmlUrl}>{name}</a>
    </ActiveItem>
  );

  return index === curIndex ? activeItem : defaultItem;
};
