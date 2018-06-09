import * as React from 'react';
import styled from 'styled-components';
import Item from '../item/Item';
import { connect } from 'react-redux';
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
  repos: any;
}

class ItemList extends React.Component<ItemListProps> {
  render() {
    const { list } = this.props.repos;

    return (
      <Items className="item_list">
        {list.map((repo: ItemType, i: number) => (
          <Item key={i} index={i} item={repo} />
        ))}
      </Items>
    );
  }
}

const mapStateToProps = (state: ItemListProps) => ({
  repos: state.repos,
});

export default connect(mapStateToProps)(ItemList);
