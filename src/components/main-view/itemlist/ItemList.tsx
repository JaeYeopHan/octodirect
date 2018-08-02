import React from 'react';

import { Item } from '../item/Item';
import { ItemType } from '../../../model/item.model';
import { ItemsLayout } from '../../../styled-components/ItemsLayout';
import { NotFound } from './not-found/NotFound';
import { $ } from '../../../utils/dom';
import { RepoState } from '../../../reducers/repos.reducers';
import { FetchResponseType } from '../../../saga/repos.saga';
import { Loading } from './loading/Loading';

interface ItemListProps {
  repos: RepoState;
}

const fixScroll = (index: number) => {
  const height = 41;
  const boxHeight = 124;
  const scrollElm: HTMLElement = $('#fix_scroll');

  if (index >= 3 && scrollElm) {
    const targetY = index * height - boxHeight;

    scrollElm.scrollTop = targetY;
  }
};

export const ItemList: React.SFC<ItemListProps> = ({ repos }) => {
  const { filtered, value, index, fetchResponseType } = repos;
  const Results = (
    <ItemsLayout id="fix_scroll">
      {filtered.map((repo: ItemType, i: number) => (
        <Item key={i} index={i} curIndex={index} item={repo} />
      ))}
    </ItemsLayout>
  );
  const NoResult = <NotFound value={value} />;

  fixScroll(index); // FIXME: Currently, Dom select when every render.

  if (fetchResponseType === FetchResponseType.FETCH_READY) {
    return <Loading />;
  }

  return filtered.length > 0 ? Results : NoResult;
};
