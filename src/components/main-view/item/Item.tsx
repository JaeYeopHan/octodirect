import React from 'react';
import styled from 'styled-components';

import { ItemType } from '../../../model/item.model';
import {
  Text,
  // @ts-ignore
} from 'evergreen-ui';

const DefaultItem = styled.li`
  padding: 4px 0px 4px 10px;
  height: 100%;
  border-bottom: 1px solid #dddddd;
  border-left: 3px solid #fafbfc;
  vertical-align: middle;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ActiveItem = DefaultItem.extend`
  border-left: 3px solid #0366d6;
  background-color: #f3f9ff;
`;

const DetailSpan = styled.span`
  padding-left: 4px;
  font-size: 12px;
  font-weight: lighter;
  color: #a9bbcb;
`;

interface ItemProps {
  item: ItemType;
  index: number;
  curIndex: number;
  onClickItem: (url: string) => void;
}

export const Item: React.SFC<ItemProps> = ({
  item,
  index,
  curIndex,
  onClickItem,
}) => {
  const { id, name, htmlUrl } = item;
  const defaultItem = (
    <DefaultItem key={id} onClick={() => onClickItem(htmlUrl)}>
      <Text color="#435a6f">
        <a href={htmlUrl}>{name}</a>
      </Text>
    </DefaultItem>
  );
  const activeItem = (
    <ActiveItem
      key={id}
      aria-selected="true"
      onClick={() => onClickItem(htmlUrl)}
    >
      <Text color="#435a6f">
        <a href={htmlUrl}>{name}</a>
        <DetailSpan>({htmlUrl})</DetailSpan>
      </Text>
    </ActiveItem>
  );

  return index === curIndex ? activeItem : defaultItem;
};
