// tslint:disable:no-duplicate-string
import {
  RepoState,
  reposReducers,
  refineData,
  getRepoId,
} from '../../../reducers/repos.reducers'
import { FetchResponseType, FetchDataResponse } from '../../../saga/repos.saga'
import { actions } from '../../../actions/actions'
import { RepositoryInfo } from '../../../service/github-repository.service'
import { ItemType } from '../../../model/item.model'

function getInitialState(): RepoState {
  return {
    list: [],
    filtered: [],
    index: 0,
    value: '',
    maxIndex: 0,
    fetchResponseType: FetchResponseType.FETCH_READY,
  }
}

test('fetchSuccess() when empty array', () => {
  // Given
  const state = getInitialState()
  const payload: FetchDataResponse = {
    response: FetchResponseType.SUCCESS,
    data: [],
  }
  const fetchSuccess = actions.fetchSuccess(payload)

  // When
  const result = reposReducers(state, fetchSuccess)

  // Then
  const expected = {
    ...state,
    ...{
      fetchResponseType: payload.response,
    },
  }
  expect(result).toEqual(expected)
})

test('fetchSuccess() when refined array', () => {
  // Given
  const state = getInitialState()
  const payload: FetchDataResponse = {
    response: FetchResponseType.SUCCESS,
    data: [
      { id: '1', name: 'name1', url: 'https://github.com/JaeYeopHan/test1' },
      { id: '2', name: 'name2', url: 'https://github.com/JaeYeopHan/test2' },
      {
        id: '33',
        name: 'name33',
        url: 'https://github.com/JaeYeopHan/test3/test33',
      },
      { id: '3', name: 'name3', url: 'https://github.com/JaeYeopHan/test3' },
    ],
  }
  const fetchSuccess = actions.fetchSuccess(payload)

  // When
  const result = reposReducers(state, fetchSuccess)

  // Then
  const expected = {
    ...state,
    ...{
      fetchResponseType: FetchResponseType.SUCCESS,
      filtered: [
        {
          id: '1',
          name: 'name1',
          htmlUrl: 'https://github.com/JaeYeopHan/test1',
        },
        {
          id: '2',
          name: 'name2',
          htmlUrl: 'https://github.com/JaeYeopHan/test2',
        },
        {
          id: '3',
          name: 'name3',
          htmlUrl: 'https://github.com/JaeYeopHan/test3',
        },
      ],
      index: 0,
      list: [
        {
          id: '1',
          name: 'name1',
          htmlUrl: 'https://github.com/JaeYeopHan/test1',
        },
        {
          id: '2',
          name: 'name2',
          htmlUrl: 'https://github.com/JaeYeopHan/test2',
        },
        {
          id: '3',
          name: 'name3',
          htmlUrl: 'https://github.com/JaeYeopHan/test3',
        },
      ],
      maxIndex: 3,
    },
  }
  expect(result).toEqual(expected)
})

test('incrementIndex() when empty array', () => {
  // Given
  const state = getInitialState()

  // When
  const INCREMENT_INDEX = actions.incrementIndex()
  const result = reposReducers(state, INCREMENT_INDEX)

  // Then
  expect(result).toEqual({
    ...state,
    fetchResponseType: 'FETCH_READY',
    filtered: [],
    index: 1,
    list: [],
    maxIndex: 0,
    value: '',
  })
})

test('incrementIndex() when normal status', () => {
  // Given
  const state = {
    ...getInitialState(),
    list: [
      {
        id: '1',
        name: 'name1',
        htmlUrl: 'https://github.com/JaeYeopHan/test1',
      },
      {
        id: '2',
        name: 'name2',
        htmlUrl: 'https://github.com/JaeYeopHan/test2',
      },
    ],
  }

  // When
  const INCREMENT_INDEX = actions.incrementIndex()
  const result = reposReducers(state, INCREMENT_INDEX)

  // Then
  expect(result).toEqual({
    ...state,
    ...{
      fetchResponseType: 'FETCH_READY',
      filtered: [],
      index: 1,
      list: [
        {
          id: '1',
          name: 'name1',
          htmlUrl: 'https://github.com/JaeYeopHan/test1',
        },
        {
          id: '2',
          name: 'name2',
          htmlUrl: 'https://github.com/JaeYeopHan/test2',
        },
      ],
      maxIndex: 0,
      value: 'name2',
    },
  })
})

test('refinedData return empty array', () => {
  // Given

  // When
  const result = refineData((null as unknown) as RepositoryInfo[])

  // Then
  expect(result).toEqual([])
})

test('refinedData return refined ItemType array', () => {
  // Given
  const data: RepositoryInfo[] = [{ id: '1', name: 'name', url: 'htmlUrl' }]

  // When
  const result = refineData(data)

  // Then
  expect(result).toEqual([{ id: '1', name: 'name', htmlUrl: 'htmlUrl' }])
})

test('getRepoId return id', () => {
  // Given
  const item: ItemType = {
    id: '1',
    name: 'name',
    htmlUrl: 'https://www.naver.com/page?edit=true',
  }

  // When
  const result = getRepoId(item)

  // Then
  expect(result).toEqual('/page')
})
