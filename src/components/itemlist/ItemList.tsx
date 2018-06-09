import * as React from 'react';
import Item from '../item/Item';
import { connect } from 'react-redux';
import { ItemType } from '../../model/item.model';
import { ItemsLayout } from '../../styled-components/ItemsLayout';
import { NotFound } from '../not-found/NotFound';

interface ItemListProps {
  repos: any;
}

const ItemList = ({ repos }: ItemListProps) =>
  repos.list.length > 0 ? (
    <ItemsLayout className="item_list">
      {repos.list.map((repo: ItemType, i: number) => (
        <Item key={i} index={i} item={repo} />
      ))}
    </ItemsLayout>
  ) : (
    <NotFound value={`temporary value`} />
  );

const mapStateToProps = (state: ItemListProps) => ({
  repos: state.repos,
});

export default connect(mapStateToProps)(ItemList);
