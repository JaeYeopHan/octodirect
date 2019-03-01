import { filterByItem } from '../../../../utils/Array';

describe('utils/Array.ts', () => {
  type Item = {
    id: number;
    name: string;
  };

  const mockData: Item[] = [
    { id: 1, name: 'one' },
    { id: 2, name: 'two' },
    { id: 3, name: 'three' },
  ];

  it('filterByItem() when empty string value', () => {
    // Given
    const value = '';

    // When
    const result = filterByItem(mockData, value);

    // Then
    const expected = mockData;
    expect(result).toEqual(expected);
  });

  it('filterByItem() when uppercase value', () => {
    // Given
    const value = 'ONE';

    // When
    const result = filterByItem(mockData, value);

    // Then
    const expected = [{ id: 1, name: 'one' }];
    expect(result).toEqual(expected);
  });

  it('filterByItem() when single value', () => {
    // Given
    const value = 'e';

    // When
    const result = filterByItem(mockData, value);

    // Then
    const expected = [{ id: 1, name: 'one' }, { id: 3, name: 'three' }];
    expect(result).toEqual(expected);
  });
});
