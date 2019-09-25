import _ from 'lodash'
import parse from 'url-parse'
import { Reducer } from 'redux'
import { ItemType } from '../model/item.model'
import { RepositoryInfo } from '../service/github-repository.service'
import { FetchResponseType } from '../saga/repos.saga'
import { filterByItem } from '../../src/utils/Array'
import { ActionTypes, Actions } from '../actions/actions'

export interface RepoState {
  list: ItemType[]
  filtered: ItemType[]
  index: number
  maxIndex: number
  value: string
  fetchResponseType: FetchResponseType
}

const initialState: RepoState = {
  list: [],
  filtered: [],
  index: 0,
  value: '',
  maxIndex: 0,
  fetchResponseType: FetchResponseType.FETCH_READY,
}

export const reposReducers: Reducer<Readonly<RepoState>> = (
  state: RepoState = initialState,
  action: Actions,
): RepoState => {
  switch (action.type) {
    case ActionTypes.FETCH_SUCCESS: {
      const { response, data } = action.payload
      const list = refineData(data)
      const refined = _.uniqBy(list, getRepoId)
      const filtered = filterByItem(refined, state.value)

      return {
        ...state,
        list: refined,
        filtered,
        maxIndex: filtered.length > 0 ? filtered.length : 0, // for search item
        fetchResponseType: response,
      }
    }

    case ActionTypes.FETCH_FAIL: {
      return {
        ...state,
        list: [],
        fetchResponseType: FetchResponseType.UNKNOWN_ERROR,
      }
    }

    case ActionTypes.INCREMENT_INDEX: {
      const { index, list } = state
      const changedIndex = index + 1

      if (!list[changedIndex]) {
        return {
          ...state,
          index: changedIndex,
        }
      }

      const selectedValue = list[changedIndex].name

      return {
        ...state,
        index: changedIndex,
        value: selectedValue,
      }
    }

    case ActionTypes.DECREMENT_INDEX: {
      const { index, list } = state
      const changedIndex = index - 1
      const selectedValue = list[changedIndex].name

      return {
        ...state,
        index: changedIndex,
        value: selectedValue,
      }
    }

    case ActionTypes.UPDATE_VALUE: {
      const value = action.payload
      const filtered = filterByItem(state.list, value)

      return {
        ...state,
        value,
        filtered,
        index: 0,
        maxIndex: filtered.length, // for search item
      }
    }

    default:
      return state
  }
}

export function refineData(rawRepos: RepositoryInfo[]): ItemType[] {
  if (!rawRepos) {
    return []
  }

  return rawRepos
    .sort(
      ({ url: prevUrl }, { url: nextUrl }) => prevUrl.length - nextUrl.length,
    )
    .map(({ id, name, url: htmlUrl }: RepositoryInfo) => ({
      id,
      name,
      htmlUrl,
    }))
}

export function getRepoId(item: ItemType): string {
  const { htmlUrl: url } = item
  const { pathname } = parse(url)

  return pathname
    .split('/')
    .slice(0, 3)
    .join('/')
}
