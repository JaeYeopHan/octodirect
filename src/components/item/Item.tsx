import * as React from 'react';
import styled from 'styled-components';
import { ItemType } from '../../model/item.model';

const StyledItems = styled.li`
  padding: 8px 8px;
  height: 12px;
  border-bottom: 1px solid #DDDDDD;
  vertical-align: middle;
  font-size: 14px;
  font-weight: bold;
  overflow-x: hidden;
  white-space : nowrap;
  text-overflow : ellipsis;
  color: #24292E;
`;

const ActiveItem = StyledItems.extend`
  color: #fff;
  background-color: #0366D6;
  font-weight: bolder;
  font-size: 14px;
`;

interface ItemProps {
  item: ItemType;
  index: number;
  currentIndex: number;
}

const Item = ({ item, index, currentIndex }: ItemProps) => {
  const { id, name, htmlUrl } = item;
  const defaultItem = (
    <StyledItems key={id}>
      <a href={htmlUrl}>{name}</a>
      <a href={htmlUrl}>{name}</a>
    </StyledItems>
  );
  const activeItem = (
    <ActiveItem key={id}>
      <a href={htmlUrl}>{name}</a>
    </ActiveItem>
  );

  return index === currentIndex
    ? activeItem
    : defaultItem;
};

export default Item;
