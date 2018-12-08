import { deleteItem } from '../../../../utils/Array';

describe('utils/Array.ts', () => {
  it('deleteItem() when empty array', () => {
    // Given
    const testArray: any = [];
    const target = 'dummy';

    // When
    const results = deleteItem(testArray, target);
    const expected: any = [];

    // Then
    expect(results).toEqual(expected);
  });

  it('deleteItem() when length 1 array, do delete', () => {
    // Given
    const testArray = ['dummy'];
    const target = 'dummy';

    // When
    const results = deleteItem(testArray, target);
    const expected: any = [];

    // Then
    expect(results).toEqual(expected);
  });

  it('deleteItem() when length 1 array do not delete', () => {
    // Given
    const testArray = ['dummy'];
    const target = 'd';

    // When
    const results = deleteItem(testArray, target);
    const expected: any = testArray;

    // Then
    expect(results).toEqual(expected);
  });

  it('deleteItem() when length 2 array do delete', () => {
    // Given
    const testArray = ['dummy', 'mock'];
    const target = 'dummy';

    // When
    const results = deleteItem(testArray, target);
    const expected: any = ['mock'];

    // Then
    expect(results).toEqual(expected);
  });

  it('deleteItem() when length 2 array do not delete', () => {
    // Given
    const testArray = ['dummy', 'mock'];
    const target = 'd';

    // When
    const results = deleteItem(testArray, target);
    const expected: any = ['dummy', 'mock'];

    // Then
    expect(results).toEqual(expected);
  });

  it('deleteItem() when length 3 array do delete first element', () => {
    // Given
    const testArray = ['a', 'b', 'c'];
    const target = 'a';

    // When
    const results = deleteItem(testArray, target);
    const expected = ['b', 'c'];

    // Then
    expect(results).toEqual(expected);
  });

  it('deleteItem() when length 3 array do delete middle element', () => {
    // Given
    const testArray = ['a', 'b', 'c'];
    const target = 'b';

    // When
    const results = deleteItem(testArray, target);
    const expected = ['a', 'c'];

    // Then
    expect(results).toEqual(expected);
  });

  it('deleteItem() when length 3 array do delete last element', () => {
    // Given
    const testArray = ['a', 'b', 'c'];
    const target = 'c';

    // When
    const results = deleteItem(testArray, target);
    const expected = ['a', 'b'];

    // Then
    expect(results).toEqual(expected);
  });

  it('deleteItem() when length 4 array do delete first element', () => {
    // Given
    const testArray = ['a', 'b', 'c', 'd'];
    const target = 'a';

    // When
    const results = deleteItem(testArray, target);
    const expected = ['b', 'c', 'd'];

    // Then
    expect(results).toEqual(expected);
  });

  it('deleteItem() when length 4 array do delete middle element', () => {
    // Given
    const testArray = ['a', 'b', 'c', 'd'];
    const target = 'b';

    // When
    const results = deleteItem(testArray, target);
    const expected = ['a', 'c', 'd'];

    // Then
    expect(results).toEqual(expected);
  });

  it('deleteItem() when length 4 array do delete last element', () => {
    // Given
    const testArray = ['a', 'b', 'c', 'd'];
    const target = 'd';

    // When
    const results = deleteItem(testArray, target);
    const expected = ['a', 'b', 'c'];

    // Then
    expect(results).toEqual(expected);
  });

  it('deleteItem() when length 4 array do not delete element', () => {
    // Given
    const testArray = ['a', 'b', 'c', 'd'];
    const target = 'e';

    // When
    const results = deleteItem(testArray, target);
    const expected = ['a', 'b', 'c', 'd'];

    // Then
    expect(results).toEqual(expected);
  });
});
