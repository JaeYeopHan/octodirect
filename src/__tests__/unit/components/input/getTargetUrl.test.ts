import { getTargetUrl } from '../../../../components/main-view/input/Input'
import { ItemType } from '../../../../model/item.model'
import { GOOGLE_SEARCH_URL } from '../../../../main/appConfig'

test('return google search when same index with filtered length', () => {
  // Given
  const filtered = [
    { id: '1', name: 'name1', htmlUrl: 'test-url-1' },
    { id: '2', name: 'name2', htmlUrl: 'test-url-2' },
    { id: '3', name: 'name3', htmlUrl: 'test-url-3' },
  ]
  const value = ''
  const index = 3
  const inputValue = 'test-input-value'

  // When
  const result = getTargetUrl(filtered, value, index, inputValue)

  // Then
  expect(result).toBe(`${GOOGLE_SEARCH_URL}${inputValue}`)
})

test('return google search when empty filtered', () => {
  // Given
  const filtered = [] as ItemType[]
  const value = 'test-value'
  const index = 3
  const inputValue = 'test'

  // When
  const result = getTargetUrl(filtered, value, index, inputValue)

  // Then
  expect(result).toBe(`${GOOGLE_SEARCH_URL}${value}`)
})

test('return target url', () => {
  // Given
  const filtered = [
    { id: '1', name: 'name1', htmlUrl: 'test-url-1' },
    { id: '2', name: 'name2', htmlUrl: 'test-url-2' },
    { id: '3', name: 'name3', htmlUrl: 'test-url-3' },
  ]
  const value = 'test'
  const index = 0
  const inputValue = ''

  // When
  const result = getTargetUrl(filtered, value, index, inputValue)

  // Then
  expect(result).toBe(filtered[index].htmlUrl)
})
