import { KeyUtils } from '../../../utils/Key';

describe('utils/Key.ts', () => {
  it('KeyUtils.isCorrectUpKey to false because of index', () => {
    // Given
    const keyCode = 38;
    const index = 0;

    // When
    const result = KeyUtils.isCorrectUpKey(keyCode, index);

    // Then
    expect(result).toBe(false);
  });

  it('KeyUtils.isCorrectUpKey to false because of keycode', () => {
    // Given
    const keyCode = 15;
    const index = 0;

    // When
    const result = KeyUtils.isCorrectUpKey(keyCode, index);

    // Then
    expect(result).toBe(false);
  });

  it('KeyUtils.isCorrectUpKey to true', () => {
    // Given
    const keyCode = 38;
    const index = 1;

    // When
    const result = KeyUtils.isCorrectUpKey(keyCode, index);

    // Then
    expect(result).toBe(true);
  });

  it('KeyUtils.isCorrectDownKey to true', () => {
    // Given
    const keyCode = 40;
    const index = 1;
    const maxIndex = 30;

    // When
    const result = KeyUtils.isCorrectDownKey(keyCode, index, maxIndex);

    // Then
    expect(result).toBe(true);
  });

  it('KeyUtils.isCorrectEnterKey to true', () => {
    // Given
    const keyCode = 13;

    // When
    const result = KeyUtils.isEnterKey(keyCode);

    // Then
    expect(result).toBe(true);
  });
});
