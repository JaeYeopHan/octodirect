import * as React from 'react';
import styled from 'styled-components';
import Item from '../item/Item';
import { ItemType } from '../../model/item.model';

export const Items = styled.ul`
  position: relative;
  top: 40px;
  margin: auto 4px;
  padding: 12px;
  width: calc(100% - 36px);
  height: 100%;
  max-height: 180px;
  font-size: 14px;
  font-weight: bold;
  color: #24292e;
  background-color: #fafbfc;
  border: solid 1px #e2e4e8;
  border-radius: 3px;
  overflow-y: scroll;
`;

interface ItemListProps {
  filtered: ItemType[];
  index: number;
}

class ItemList extends React.Component<ItemListProps, {}> {
  private container: HTMLElement;

  componentDidMount() {
    this.container = document.querySelector('.item_list') as HTMLElement;
  }

  adjustScroll() {
    if (!!this.container) {
      this.container.scrollTop = this.props.index * 32;
    }
  }

  render() {
    const { filtered, index } = this.props;
    return (
      <Items ref={() => this.adjustScroll()} className="item_list">
        {filtered.map((item: ItemType, i) => (
          <Item key={i} item={item} index={i} currentIndex={index} />
        ))}
      </Items>
    );
  }
}

export default ItemList;
