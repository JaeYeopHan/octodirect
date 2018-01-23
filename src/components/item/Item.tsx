import * as React from 'react';
import styled from 'styled-components';
import { ItemType } from '../../model/item.model';

const StyledItems = styled.li`
  padding: 8px 8px;
  border-bottom: 1px solid #DDDDDD;
  font-size: 14px;
  font-weight: bold;
  overflow-x: hidden;
  white-space : nowrap;
  text-overflow : ellipsis;
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

class Item extends React.Component<ItemProps, {}> {
  render() {
    const { item, index, currentIndex } = this.props;
    const { id, name, html_url } = item;
    const defaultItem = (
      <StyledItems key={id}>
        <a href={html_url}>{name}</a>
        <a href={html_url}>{name}</a>
      </StyledItems>
    );
    const activeItem = (
      <ActiveItem key={id}>
        <a href={html_url}>{name}</a>
      </ActiveItem>
    );

    return index === currentIndex ? activeItem : defaultItem;
  }
}

export default Item;
