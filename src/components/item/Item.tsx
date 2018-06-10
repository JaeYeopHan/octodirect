import * as React from 'react';
import styled from 'styled-components';
import { ItemType } from '../../model/item.model';

const StyledItems = styled.li`
  padding: 10px 8px;
  height: 12px;
  border-bottom: 1px solid #dddddd;
  vertical-align: middle;
  font-size: 14px;
  font-weight: bold;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #24292e;
`;

const ActiveItem = StyledItems.extend`
  color: #fff;
  background-color: #0366d6;
  font-weight: bolder;
  font-size: 14px;
`;

interface ItemProps {
  item: ItemType;
  index: number;
  curIndex: number;
}

const Item = ({ item, index, curIndex }: ItemProps) => {
  const { id, name, htmlUrl } = item;
  const defaultItem = (
    <StyledItems key={id}>
      <a href={htmlUrl}>{name}</a>
    </StyledItems>
  );
  const activeItem = (
    <ActiveItem key={id}>
      <a href={htmlUrl}>{name}</a>
    </ActiveItem>
  );

  return index === curIndex ? activeItem : defaultItem;
};

export default Item;
