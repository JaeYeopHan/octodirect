import * as React from 'react';
import Item from '../item/Item';
import { connect } from 'react-redux';
import { ItemType } from '../../model/item.model';
import { ItemsLayout } from '../../styled-components/ItemsLayout';
import { NotFound } from '../not-found/NotFound';
import { $ } from '../../utils/dom';

interface ItemListProps {
  repos: any;
}

const fixScroll = (index: number) => {
  const height = 33;
  const boxHeight = 124;
  const scrollElm: HTMLElement = $('#fix_scroll');

  if (index >= 3 && scrollElm) {
    const targetY = index * height - boxHeight;

    scrollElm.scrollTop = targetY;
  }
};

const ItemList = ({ repos }: ItemListProps) => {
  const { list, value, index } = repos;
  const Results = (
    <ItemsLayout id="fix_scroll">
      {list
        .filter((repo: ItemType) => repo.name.includes(value))
        .map((repo: ItemType, i: number) => (
          <Item key={i} index={i} curIndex={index} item={repo} />
        ))}
    </ItemsLayout>
  );
  const NoResult = <NotFound value={value} />;

  fixScroll(index);
  return list.length > 0 ? Results : NoResult;
};

const mapStateToProps = (state: ItemListProps) => ({
  repos: state.repos,
});

export default connect(mapStateToProps)(ItemList);
