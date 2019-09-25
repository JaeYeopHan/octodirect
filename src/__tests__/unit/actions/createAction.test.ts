import { createAction } from '../../../actions/createAction';

describe('/actions', () => {
  it('createAction() with only type', () => {
    // Given
    const actionType = 'testAction';

    // When
    const result = createAction(actionType);

    // Then
    expect(result).toEqual({ type: actionType });
  });

  it('createAction() with payload', () => {
    // Given
    const actionType = 'testAction';
    const payload = { testData: 'testData' };

    // When
    const result = createAction(actionType, payload);

    // Then
    expect(result).toEqual({
      type: actionType,
      payload,
    });
  });
});
