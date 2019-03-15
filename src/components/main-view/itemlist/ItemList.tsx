import React from 'react'

import { Item } from '../item/Item'
import { ItemType } from '../../../model/item.model'
import { ItemsLayout } from './ItemsLayout'
import { NotFound } from './not-found/NotFound'
import { $ } from '../../../utils/DomUtils'
import { RepoState } from '../../../reducers/repos.reducers'
import { FetchResponseType } from '../../../saga/repos.saga'
import { Loading } from './loading/Loading'

interface ItemListProps {
  repos: RepoState
  onClickItem: (url: string) => void
  currentTargetValue: string
}

const fixScroll = (index: number) => {
  const height = 30.9
  const boxHeight = 80
  const scrollElm: HTMLElement = $('#fix_scroll')
  const targetY = index * height - boxHeight

  if (scrollElm) {
    scrollElm.scrollTop = targetY
  }
}

export const ItemList: React.SFC<ItemListProps> = ({
  repos,
  onClickItem,
  currentTargetValue,
}) => {
  const { filtered, value, index, fetchResponseType } = repos
  const Results = (
    <ItemsLayout id="fix_scroll">
      {filtered.map((repo: ItemType, i: number) => (
        <Item
          key={`item_${i}`}
          index={i}
          curIndex={index}
          item={repo}
          onClickItem={onClickItem}
        />
      ))}
      {currentTargetValue && (
        <Item
          key={`item_${filtered.length}`}
          index={filtered.length}
          curIndex={index}
          item={{
            id: 'search_in_google',
            name: `github: ${currentTargetValue}`,
            htmlUrl: currentTargetValue,
          }}
          onClickItem={onClickItem}
        />
      )}
    </ItemsLayout>
  )
  const NoResult = <NotFound value={value} />

  fixScroll(index) // FIXME: Currently, Dom select when every render.

  if (fetchResponseType === FetchResponseType.FETCH_READY) {
    return <Loading />
  }

  return filtered.length > 0 ? Results : NoResult
}
