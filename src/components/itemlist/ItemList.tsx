import * as React from 'react';
import Item from '../item/Item';
import { connect } from 'react-redux';
import { ItemType } from '../../model/item.model';
import { ItemsLayout } from '../../styled-components/ItemsLayout';
import { NotFound } from '../not-found/NotFound';

interface ItemListProps {
  repos: any;
}

const ItemList = ({ repos }: ItemListProps) => {
  const { list, value, index } = repos;
  const Results = (
    <ItemsLayout className="item_list">
      {list
        .filter((repo: ItemType) => repo.name.includes(value))
        .map((repo: ItemType, i: number) => (
          <Item key={i} index={i} curIndex={index} item={repo} />
        ))}
    </ItemsLayout>
  );
  const NoResult = <NotFound value={value} />;

  return list.length > 0 ? Results : NoResult;
};

const mapStateToProps = (state: ItemListProps) => ({
  repos: state.repos,
});

export default connect(mapStateToProps)(ItemList);
